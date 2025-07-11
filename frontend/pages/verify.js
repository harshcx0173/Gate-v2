// pages/forgot-password.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState(null);
  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/send-otp", { email });
      setOtpToken(res.data.otpToken);
      localStorage.setItem("otpToken", res.data.otpToken); // store temporarily
      alert("OTP sent to email!");
      router.push("/ResetPassword");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Forgot Password</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSendOtp}
        sx={{ mt: 2 }}
      >
        Send OTP
      </Button>
    </Container>
  );
}
