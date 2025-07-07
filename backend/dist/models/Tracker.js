"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var mongoose = require("mongoose");
var TrackerSchema = new mongoose.Schema(_defineProperty({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  trackerLog: [{
    time: Number,
    project: String
  }],
  durations: [{
    hr: Number,
    min: Number
  }],
  tasks: [{
    taskName: String,
    taskHours: String
  }]
}, "trackerLog", [{
  time: Number,
  project: String,
  createdAt: {
    type: Date,
    "default": Date.now
  }
}]));
module.exports = mongoose.model("Tracker", TrackerSchema);