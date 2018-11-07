var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  shopName: { type: String, required: true },
  bankName: { type: String, required: false },
  BankCode: { type: String, required: false },
  accountName: { type: String, required: false },
  accountNumber: { type: String, required: false },
  mobileNumber: { type: String, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
})

var User = mongoose.model('Users', userSchema)

module.exports = User;