"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var router = express.Router();
var auth = require("../middleware/authMiddleware");
var Tracker = require("../models/Tracker");

// ✅ GET Tracker
router.get("/", auth, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var tracker, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return Tracker.findOne({
            userId: req.user.id
          });
        case 1:
          tracker = _context.v;
          res.json(tracker || {
            trackerLog: [],
            durations: [],
            tasks: []
          });
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error("Tracker GET error:", _t);
          res.status(500).json({
            msg: "Something went wrong"
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// ✅ POST Tracker (Safe Merge)
router.post("/", auth, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body, _req$body$trackerLog, trackerLog, _req$body$durations, durations, _req$body$tasks, tasks, tracker, _tracker$trackerLog, _tracker$durations, _tracker$tasks, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _req$body = req.body, _req$body$trackerLog = _req$body.trackerLog, trackerLog = _req$body$trackerLog === void 0 ? [] : _req$body$trackerLog, _req$body$durations = _req$body.durations, durations = _req$body$durations === void 0 ? [] : _req$body$durations, _req$body$tasks = _req$body.tasks, tasks = _req$body$tasks === void 0 ? [] : _req$body$tasks;
          _context2.p = 1;
          _context2.n = 2;
          return Tracker.findOne({
            userId: req.user.id
          });
        case 2:
          tracker = _context2.v;
          if (tracker) {
            _context2.n = 4;
            break;
          }
          _context2.n = 3;
          return Tracker.create({
            userId: req.user.id,
            trackerLog: trackerLog,
            durations: durations,
            tasks: tasks
          });
        case 3:
          tracker = _context2.v;
          _context2.n = 5;
          break;
        case 4:
          if (trackerLog.length) {
            (_tracker$trackerLog = tracker.trackerLog).push.apply(_tracker$trackerLog, _toConsumableArray(trackerLog));
          }
          if (durations.length) {
            (_tracker$durations = tracker.durations).push.apply(_tracker$durations, _toConsumableArray(durations));
          }
          if (tasks.length) {
            (_tracker$tasks = tracker.tasks).push.apply(_tracker$tasks, _toConsumableArray(tasks));
          }
          _context2.n = 5;
          return tracker.save();
        case 5:
          res.json({
            msg: "Tracker updated successfully"
          });
          _context2.n = 7;
          break;
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          console.error("Tracker POST error:", _t2);
          res.status(500).json({
            msg: "Something went wrong"
          });
        case 7:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
// 🧠 Utility: convert timestamp to week string
var getWeekKey = function getWeekKey(date) {
  var d = new Date(date);
  var start = new Date(d.setDate(d.getDate() - d.getDay())); // Sunday
  var end = new Date(d.setDate(start.getDate() + 6)); // Saturday
  return "".concat(start.toDateString(), " - ").concat(end.toDateString());
};

// 🆕 Summary Route
router.get("/summary", auth, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var tracker, projectTotals, weeklyTotals, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return Tracker.findOne({
            userId: req.user.id
          });
        case 1:
          tracker = _context3.v;
          if (tracker) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.json({
            projects: {},
            weekly: {}
          }));
        case 2:
          projectTotals = {};
          weeklyTotals = {};
          tracker.trackerLog.forEach(function (log) {
            var project = log.project || "Unknown";
            var time = Number(log.time || 0);

            // 🧮 Project total
            if (!projectTotals[project]) projectTotals[project] = 0;
            projectTotals[project] += time;

            // 📅 Weekly total (by project)
            var weekKey = getWeekKey(log.createdAt || Date.now());
            if (!weeklyTotals[weekKey]) weeklyTotals[weekKey] = {};
            if (!weeklyTotals[weekKey][project]) weeklyTotals[weekKey][project] = 0;
            weeklyTotals[weekKey][project] += time;
          });
          res.json({
            projects: projectTotals,
            weekly: weeklyTotals
          });
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          console.error("Summary error:", _t3);
          res.status(500).json({
            msg: "Something went wrong"
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;