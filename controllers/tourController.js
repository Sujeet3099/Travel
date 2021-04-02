const AppError = require('../utils/appError');
const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTours = catchAsync(async (req, res, next) => {
  //creating a query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // executing the query
  const tours = await features.query;

  // sending the response
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { numTours: -1 },
    },
    {
      // will send only 5 documents
      $limit: 5,
    },
  ]);
  res.status(200).json({
    status: 'success',
    result: plan.length,
    data: { plan },
  });
});

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // same as Tour.findOne({_id:req.params.id})
  if (!tour) return next(new AppError(`No Tour found with that ID`, 404));
  res.json({
    status: 'success',
    result: 1,
    data: { tour: tour },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  if (!newTour) return next(new AppError());
  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
});

exports.deleteTour = catchAsync(async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
  });
});

exports.updateTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ status: 'success', data: { tour } });
});

exports.getTourStats = catchAsync(async (req, res) => {});
