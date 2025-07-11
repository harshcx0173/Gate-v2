"use client";

import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setOtp(value);
    if (value.length === 6) {
      handleVerify(value); // Auto-verify when 6 digits entered
    }
  };

  const handleVerify = async (otpValue) => {
    setLoading(true);
    setError("");
    try {
      let email = localStorage.getItem("email");
      if (!email) {
        email = window.prompt("Enter your email for verification:");
        if (!email) {
          setError("Email is required for OTP verification.");
          setLoading(false);
          return;
        }
      }
      const baseURL =
        typeof window !== "undefined" && window.location.hostname === "192.168.1.38"
          ? "http://localhost:8000"
          : "http://localhost:8000";
      const res = await fetch(`${baseURL}/api/auth/verify-otp-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("OTP Verified!");
        router.push("/residential/dashboard");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Server error verifying OTP.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#00BFFF">
          <span style={{ color: "black" }}>Mygate</span>Update
        </Typography>
        <Typography variant="h5" mt={3}>
          OTP Verification
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          Enter the 6-digit code sent to your email
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleVerify}>
        <TextField
          fullWidth
          margin="normal"
          label="OTP Code"
          value={otp}
          onChange={handleOtpChange}
          inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ my: 2, bgcolor: "#00D5FF" }}
          type="button"
          disabled={loading || otp.length !== 6}
          onClick={() => handleVerify(otp)}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
