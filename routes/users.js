var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

require('../models/db').Connect()
var User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res) {
  User.find({}).sort({firstName: 1}).exec()
  .then(users => {
    if (users.length > 0) { res.json(users); return; }
    res.json({
      'success': false,
      'status': 200,
      'message': 'No users found'
    });
  })
  .catch(err => res.json({
    'success': false,
    'status': 500,
    'message': err
  }));

  return;
});

router.post('/', function (req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    shopName: req.body.shopName,
    bankName: req.body.bankName,
    BankCode: req.body.BankCode,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    mobileNumber: req.body.mobileNumber,
    active: req.body.active,
    createdAt: req.body.createdAt
  });
  // var user = new User({...req.body})

  user.save()
  .then(() => {
    res.json({
      'success': true,
      'status': 201,
      'message': 'User created successfully'
    });
  })
  .catch(err => {
    msg = err.message.split('failed: ')[1].split('., ');
    res.json({
      'success': false,
      'status': 500,
      'message': msg
    });
  })

  return;
})

router.get('/:acctNo', function (req, res) {
  User.find({accountNumber: req.params.acctNo})
  .then(user => {console.log(req.params.acctNo)
    if (user.length > 0) { res.json(user); return; }
    res.json({
      'success': false,
      'status': 200,
      'message': 'User doesn\'t exist'
    });
  })
  .catch(err => res.json({
    'success': false,
    'status': 500,
    'message': err
  }));

  return
})

module.exports = router;
