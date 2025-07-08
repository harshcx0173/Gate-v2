"use strict";

var mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String,

//   // For Forgot Password
//   resetOtp: String,
//   resetOtpExpiry: Date,
// });

// models/User.js
// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String,

//   // OTP fields
//   resetOtp: String,
//   otpExpiry: Date,
//   isApproved: {
//     type: Boolean,
//     default: false,
//   },
//   isDeclined: {
//     type: Boolean,
//     default: true,
//   },
//   isOwner: Boolean,
//   maintenanceDue: Boolean,
// });

// module.exports = mongoose.model("User", userSchema);

var userSchema = new mongoose.Schema({
  // Existing fields
  fullName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  // OTP fields
  resetOtp: String,
  otpExpiry: Date,
  loginOtp: Number,
  // For login OTP
  loginOtpExpiry: Date,
  // For login OTP expiry
  isApproved: {
    type: Boolean,
    "default": false
  },
  isDeclined: {
    type: Boolean,
    "default": true // Note: This defaults to true in your original schema
  },
  isOwner: Boolean,
  maintenanceDue: Boolean,
  // New society management fields
  residentType: {
    type: String,
    "enum": ['owner', 'tenant', 'family']
    // This will work with your existing isOwner field
    // where 'owner' corresponds to isOwner: true
  },
  towerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tower'
  },
  flatNumber: String,
  phoneNumber: String,
  // Additional metadata
  registeredAt: {
    type: Date,
    "default": Date.now
  },
  lastLogin: Date
});

// Define a compound index to ensure unique flat occupancy
// This prevents multiple approved owners or tenants for the same flat
userSchema.index({
  towerName: 1,
  flatNumber: 1,
  residentType: 1
}, {
  unique: true,
  partialFilterExpression: {
    residentType: {
      $in: ['owner', 'tenant']
    },
    isApproved: true,
    isDeclined: false
  }
});

// Pre-save hook to sync residentType with isOwner for backward compatibility
userSchema.pre('save', function (next) {
  // If residentType is set to 'owner', ensure isOwner is true
  if (this.residentType === 'owner') {
    this.isOwner = true;
  }
  // If residentType is not 'owner', ensure isOwner is false
  else if (this.residentType) {
    this.isOwner = false;
  }
  next();
});
module.exports = mongoose.model("User", userSchema);