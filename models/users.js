var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  shopName: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: false,
    set: val => val.toLowerCase(),
    get: val => val.toLowerCase()
  },
  BankCode: {
    type: String, required: false
  },
  accountName: {
    type: String,
    required: false,
    set: val => val.toLowerCase(),
    get: val => val.toLowerCase()
  },
  accountNumber: {
    type: String, required: false
  },
  mobileNumber: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean, default: false
  },
  createdAt: {
    type: Date, required: true, default: Date.now
  },
  isDeleted: { 
    type: String,
    enum: ['active', 'soft'],
    default: 'active'
  }
})

var User = mongoose.model('Users', userSchema)

module.exports = User;