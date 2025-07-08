"use strict";

var jwt = require("jsonwebtoken");
var authMiddleware = function authMiddleware(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1];
  if (!token) return res.status(401).json({
    msg: "Token missing"
  });
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Invalid token"
    });
  }
};
module.exports = authMiddleware;