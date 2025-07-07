"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var bcrypt = require("bcryptjs");
var User = require("../models/user");
var router = express.Router();
var nodemailer = require("nodemailer");

// // Register Route
// router.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, password, role } = req.body;

//     if (!fullName || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       fullName,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error during registration." });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required." });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     // ❌ Check if user is declined
//     if (user.isDeclined) {
//       return res.status(403).json({
//         message: "Your account has been declined by the admin.",
//       });
//     }

//     // ⏳ Check if user is not yet approved
//     if (!user.isApproved) {
//       return res.status(403).json({
//         message: "Your account is pending admin approval.",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Password Not Matched!" });
//     }

//     // ✅ Login success – generate token if needed
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error during login." });
//   }
// });

router.post("/register", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, fullName, email, password, role, residentType, towerName, flatNumber, phoneNumber, existingUser, existingFlat, hashedPassword, newUser, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, password = _req$body.password, role = _req$body.role, residentType = _req$body.residentType, towerName = _req$body.towerName, flatNumber = _req$body.flatNumber, phoneNumber = _req$body.phoneNumber; // Validate required fields
          if (!(!fullName || !email || !password || !role)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Basic information fields are required."
          }));
        case 1:
          if (!(role === "residential" && (!towerName || !flatNumber || !residentType))) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Residence details are required."
          }));
        case 2:
          _context.n = 3;
          return User.findOne({
            email: email.toLowerCase()
          });
        case 3:
          existingUser = _context.v;
          if (!existingUser) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Email already registered."
          }));
        case 4:
          if (!(role === "residential" && (residentType === "owner" || residentType === "tenant"))) {
            _context.n = 6;
            break;
          }
          _context.n = 5;
          return User.findOne({
            towerName: towerName,
            flatNumber: flatNumber,
            residentType: residentType,
            isApproved: true,
            isDeclined: false
          });
        case 5:
          existingFlat = _context.v;
          if (!existingFlat) {
            _context.n = 6;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "This flat already has a registered ".concat(residentType, ".")
          }));
        case 6:
          _context.n = 7;
          return bcrypt.hash(password, 12);
        case 7:
          hashedPassword = _context.v;
          // Create new user with all fields
          newUser = new User({
            fullName: fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role,
            residentType: role === "residential" ? residentType : undefined,
            towerName: role === "residential" ? towerName : undefined,
            flatNumber: role === "residential" ? flatNumber : undefined,
            phoneNumber: phoneNumber,
            isApproved: false,
            // Default to pending approval
            isDeclined: false,
            registeredAt: new Date()
          });
          _context.n = 8;
          return newUser.save();
        case 8:
          res.status(201).json({
            message: "Registration successful. Your account is pending admin approval."
          });
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          console.error("Register error:", _t);
          res.status(500).json({
            message: "Server error during registration."
          });
        case 10:
          return _context.a(2);
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/login", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, isMatch, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "Email and password required."
          }));
        case 1:
          _context2.n = 2;
          return User.findOne({
            email: email.toLowerCase()
          });
        case 2:
          user = _context2.v;
          if (user) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "Invalid credentials!"
          }));
        case 3:
          if (!user.isDeclined) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(403).json({
            message: "Your account has been declined by the admin."
          }));
        case 4:
          if (user.isApproved) {
            _context2.n = 5;
            break;
          }
          return _context2.a(2, res.status(403).json({
            message: "Your account is pending admin approval."
          }));
        case 5:
          _context2.n = 6;
          return bcrypt.compare(password, user.password);
        case 6:
          isMatch = _context2.v;
          if (isMatch) {
            _context2.n = 7;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "Password Not Matched!"
          }));
        case 7:
          // ✅ Login success – generate token if needed
          res.status(200).json({
            message: "Login successful",
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
              role: user.role,
              // Include additional fields in response
              residentType: user.residentType,
              towerName: user.towerName,
              flatNumber: user.flatNumber,
              phoneNumber: user.phoneNumber
            }
          });
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t2 = _context2.v;
          console.error("Login error:", _t2);
          res.status(500).json({
            message: "Server error during login."
          });
        case 9:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/send-otp", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var email, user, otp, otpExpiry, transporter, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          email = req.body.email;
          _context3.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context3.v;
          if (user) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "User not found!"
          }));
        case 2:
          otp = Math.floor(100000 + Math.random() * 900000);
          otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
          user.resetOtp = otp;
          user.otpExpiry = otpExpiry;
          _context3.n = 3;
          return user.save();
        case 3:
          // send email
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          _context3.n = 4;
          return transporter.sendMail({
            from: "\"MyGate App\" <".concat(process.env.EMAIL_USER, ">"),
            to: email,
            subject: "OTP for Password Reset",
            html: "<h2>Your OTP: ".concat(otp, "</h2><p>Valid for 10 minutes</p>")
          });
        case 4:
          // return token to frontend
          res.status(200).json({
            message: "OTP sent successfully",
            otpToken: user._id // or create your own short token if needed
          });
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t3 = _context3.v;
          console.error("OTP send error:", _t3);
          res.status(500).json({
            message: "Server error sending OTP"
          });
        case 6:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 5]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// 2. Verify OTP and Reset Password Route
router.post("/verify-otp", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body3, otp, newPassword, otpToken, decoded, email, user, hashedPassword, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _req$body3 = req.body, otp = _req$body3.otp, newPassword = _req$body3.newPassword, otpToken = _req$body3.otpToken;
          if (otpToken) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: "Missing token!"
          }));
        case 1:
          _context4.p = 1;
          decoded = jwt.verify(otpToken, process.env.JWT_SECRET);
          email = decoded.email;
          _context4.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context4.v;
          if (!(!user || user.resetOtp !== otp || user.resetOtpExpiry < Date.now())) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: "Invalid OTP or OTP expired!"
          }));
        case 3:
          _context4.n = 4;
          return bcrypt.hash(newPassword, 12);
        case 4:
          hashedPassword = _context4.v;
          user.password = hashedPassword;
          user.resetOtp = null;
          user.resetOtpExpiry = null;
          _context4.n = 5;
          return user.save();
        case 5:
          res.status(200).json({
            message: "Password reset successful!"
          });
          _context4.n = 7;
          break;
        case 6:
          _context4.p = 6;
          _t4 = _context4.v;
          res.status(400).json({
            message: "Invalid or expired token!"
          });
        case 7:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/reset-password", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$body4, otpToken, otp, newPassword, user, hashedPassword, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          _req$body4 = req.body, otpToken = _req$body4.otpToken, otp = _req$body4.otp, newPassword = _req$body4.newPassword;
          _context5.n = 1;
          return User.findById(otpToken);
        case 1:
          user = _context5.v;
          if (!(!user || user.resetOtp !== otp || Date.now() > user.otpExpiry)) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: "Invalid OTP or OTP expired!"
          }));
        case 2:
          _context5.n = 3;
          return bcrypt.hash(newPassword, 12);
        case 3:
          hashedPassword = _context5.v;
          user.password = hashedPassword;

          // Clear OTP
          user.resetOtp = null;
          user.otpExpiry = null;
          _context5.n = 4;
          return user.save();
        case 4:
          res.status(200).json({
            message: "Password reset successful!"
          });
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t5 = _context5.v;
          console.error("Reset password error:", _t5);
          res.status(500).json({
            message: "Server error resetting password"
          });
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 5]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
router.get("/admin/pending-users", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var users, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return User.find({
            isApproved: false,
            isDeclined: false // 👈 Add this line to exclude declined users
          });
        case 1:
          users = _context6.v;
          res.json(users);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t6 = _context6.v;
          res.status(500).json({
            message: "Server error fetching pending users"
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
router.patch("/admin/approve-user/:id", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var userId, user, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.p = 0;
          userId = req.params.id;
          console.log("userId:", userId);
          _context7.n = 1;
          return User.findByIdAndUpdate(userId, {
            isApproved: true,
            isDeclined: false
          }, {
            "new": true
          });
        case 1:
          user = _context7.v;
          console.log("user:", user);
          if (user) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: "User not found"
          }));
        case 2:
          res.json({
            message: "User approved successfully",
            user: user
          });
          _context7.n = 4;
          break;
        case 3:
          _context7.p = 3;
          _t7 = _context7.v;
          res.status(500).json({
            message: "Server error approving user"
          });
        case 4:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 3]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
router.patch("/admin/decline-user/:id", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var userId, user, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.p = 0;
          userId = req.params.id;
          console.log("Declining userId:", userId);
          _context8.n = 1;
          return User.findByIdAndUpdate(userId, {
            isDeclined: true,
            isApproved: false
          },
          // add this field in your model
          {
            "new": true
          });
        case 1:
          user = _context8.v;
          if (user) {
            _context8.n = 2;
            break;
          }
          return _context8.a(2, res.status(404).json({
            message: "User not found"
          }));
        case 2:
          res.json({
            message: "User declined successfully",
            user: user
          });
          _context8.n = 4;
          break;
        case 3:
          _context8.p = 3;
          _t8 = _context8.v;
          res.status(500).json({
            message: "Server error declining user"
          });
        case 4:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 3]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());

// Send OTP for login route
router.post("/send-otp-login", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var email, user, otp, otpExpiry, transporter, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.p = 0;
          email = req.body.email;
          _context9.n = 1;
          return User.findOne({
            email: email
          });
        case 1:
          user = _context9.v;
          if (user) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, res.status(400).json({
            message: "User not found!"
          }));
        case 2:
          otp = Math.floor(100000 + Math.random() * 900000);
          otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
          user.loginOtp = otp;
          user.loginOtpExpiry = otpExpiry;
          _context9.n = 3;
          return user.save();
        case 3:
          // send email
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          _context9.n = 4;
          return transporter.sendMail({
            from: "\"MyGate App\" <".concat(process.env.EMAIL_USER, ">"),
            to: email,
            subject: "OTP for Login Verification",
            html: "<h2>Your Login OTP: ".concat(otp, "</h2><p>Valid for 10 minutes</p>")
          });
        case 4:
          res.status(200).json({
            message: "Login OTP sent successfully",
            otpToken: user._id // or create your own short token if needed
          });
          _context9.n = 6;
          break;
        case 5:
          _context9.p = 5;
          _t9 = _context9.v;
          console.error("Login OTP send error:", _t9);
          res.status(500).json({
            message: "Server error sending login OTP"
          });
        case 6:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 5]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());

// Verify OTP for login route
router.post("/verify-otp-login", /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _req$body5, email, otp, user, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.p = 0;
          _req$body5 = req.body, email = _req$body5.email, otp = _req$body5.otp;
          if (!(!email || !otp)) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2, res.status(400).json({
            message: "Email and OTP are required."
          }));
        case 1:
          _context0.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context0.v;
          if (user) {
            _context0.n = 3;
            break;
          }
          return _context0.a(2, res.status(400).json({
            message: "User not found!"
          }));
        case 3:
          if (!(!user.loginOtp || !user.loginOtpExpiry || user.loginOtp !== parseInt(otp) || Date.now() > user.loginOtpExpiry)) {
            _context0.n = 4;
            break;
          }
          return _context0.a(2, res.status(400).json({
            message: "Invalid or expired OTP!"
          }));
        case 4:
          // OTP is valid
          user.loginOtp = null;
          user.loginOtpExpiry = null;
          _context0.n = 5;
          return user.save();
        case 5:
          res.status(200).json({
            message: "OTP verified successfully!"
          });
          _context0.n = 7;
          break;
        case 6:
          _context0.p = 6;
          _t0 = _context0.v;
          console.error("Login OTP verify error:", _t0);
          res.status(500).json({
            message: "Server error verifying login OTP"
          });
        case 7:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 6]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());
module.exports = router;