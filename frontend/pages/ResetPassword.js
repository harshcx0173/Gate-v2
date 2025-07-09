// pages/reset-password.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    const otpToken = localStorage.getItem("otpToken"); // retrieve from localStorage
    if (!otpToken) return alert("Missing OTP token!");

    try {
      await axios.post("https://gate-v2.onrender.com/api/auth/reset-password", {
        otp,
        newPassword,
        otpToken,
      });
      alert("Password reset successful");
      localStorage.removeItem("otpToken");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Reset Password</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleReset}
      >
        Reset Password
      </Button>
    </Container>
  );
}
