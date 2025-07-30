const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();
const nodemailer = require("nodemailer");

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

router.post("/register", async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      role, 
      residentType,
      towerName, 
      flatNumber, 
      phoneNumber 
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "Basic information fields are required." });
    }

    // For residential users, validate society-specific fields
    if (role === "residential" && (!towerName || !flatNumber || !residentType)) {
      return res.status(400).json({ message: "Residence details are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Check if flat is already registered to an active user (owner or tenant)
    if (role === "residential" && (residentType === "owner" || residentType === "tenant")) {
      const existingFlat = await User.findOne({ 
        towerName, 
        flatNumber, 
        residentType,
        isApproved: true,
        isDeclined: false
      });
      
      if (existingFlat) {
        return res.status(400).json({ 
          message: `This flat already has a registered ${residentType}.` 
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with all fields
    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      residentType: role === "residential" ? residentType : undefined,
      towerName: role === "residential" ? towerName : undefined,
      flatNumber: role === "residential" ? flatNumber : undefined,
      phoneNumber,
      isApproved: false, // Default to pending approval
      isDeclined: false,
      registeredAt: new Date()
    });

    await newUser.save();

    res.status(201).json({ 
      message: "Registration successful. Your account is pending admin approval." 
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // ❌ Check if user is declined
    if (user.isDeclined) {
      return res.status(403).json({
        message: "Your account has been declined by the admin.",
      });
    }

    // ⏳ Check if user is not yet approved
    if (!user.isApproved) {
      return res.status(403).json({
        message: "Your account is pending admin approval.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Not Matched!" });
    }

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
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});
  

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetOtp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MyGate App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP for Password Reset",
      html: `<h2>Your OTP: ${otp}</h2><p>Valid for 10 minutes</p>`,
    });

    // return token to frontend
    res.status(200).json({
      message: "OTP sent successfully",
      otpToken: user._id, // or create your own short token if needed
    });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Server error sending OTP" });
  }
});

// 2. Verify OTP and Reset Password Route
router.post("/verify-otp", async (req, res) => {
  const { otp, newPassword, otpToken } = req.body;

  if (!otpToken) return res.status(400).json({ message: "Missing token!" });

  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);
    const email = decoded.email;

    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP or OTP expired!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token!" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { otpToken, otp, newPassword } = req.body;

    const user = await User.findById(otpToken);

    if (!user || user.resetOtp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid OTP or OTP expired!" });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;

    // Clear OTP
    user.resetOtp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error resetting password" });
  }
});

router.get("/admin/pending-users", async (req, res) => {
  try {
    const users = await User.find({
      isApproved: false,
      isDeclined: false, // 👈 Add this line to exclude declined users
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching pending users" });
  }
});

router.patch("/admin/approve-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userId:", userId);
    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved: true, isDeclined: false },
      { new: true }
    );
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User approved successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error approving user" });
  }
});

router.patch("/admin/decline-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Declining userId:", userId);

    const user = await User.findByIdAndUpdate(
      userId,
      { isDeclined: true, isApproved: false }, // add this field in your model
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User declined successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error declining user" });
  }
});

// Send OTP for login route
router.post("/send-otp-login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found!" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.loginOtp = otp;
    user.loginOtpExpiry = otpExpiry;
    await user.save();

    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: `"MyGate App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP for Login Verification",
      html: `<h2>Your Login OTP: ${otp}</h2><p>Valid for 10 minutes</p>`,
    });

    res.status(200).json({
      message: "Login OTP sent successfully",
      otpToken: user._id, // or create your own short token if needed
    });
  } catch (err) {
    console.error("Login OTP send error:", err);
    res.status(500).json({ message: "Server error sending login OTP" });
  }
});

// Verify OTP for login route
router.post("/verify-otp-login", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    if (
      !user.loginOtp ||
      !user.loginOtpExpiry ||
      user.loginOtp !== parseInt(otp) ||
      Date.now() > user.loginOtpExpiry
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP!" });
    }
    // OTP is valid
    user.loginOtp = null;
    user.loginOtpExpiry = null;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (err) {
    console.error("Login OTP verify error:", err);
    res.status(500).json({ message: "Server error verifying login OTP" });
  }
});

module.exports = router;
