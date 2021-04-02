const fs = require('fs');
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    result: 'success',
    data: 'all users in real api',
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  const newUser = users.find((el) => el._id === id);
  if (!newUser) {
    result: 'failed',
      res.status(404).json({
        message: 'invalidID',
      });
    return;
  }
  res.status(200).json({
    result: 'success',
    data: 'user in real api',
  });
};

exports.createUser = (req, res) => {
  res.status(200).json({
    result: 'success',
    data: 'create user in real api',
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const newUser = users.find((el) => el._id === id);
  if (!newUser) {
    res.status(404).json({
      result: 'failed',
      message: 'invalidID',
    });
    return;
  }
  res.status(204).json({
    result: 'success',
    data: 'Done',
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const newUser = users.find((el) => el._id === id);
  if (!newUser) {
    res.send(404).json({
      result: 'failed',
      message: 'invalidID',
    });
    return;
  }
  res.send(201).json({
    result: 'success',
    data: 'Done',
  });
};
