"use client";

// pages/login.js
// pages/login.js
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

const baseURL =
  typeof window !== "undefined" && window.location.hostname === "192.168.1.38"
    ? "https://gate-v2-production-8b45.up.railway.app"
    : "https://gate-v2-production-8b45.up.railway.app";


export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(""); // To store the JWT token

  // Handle submit for login
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(""); // Reset error
    console.log(baseURL)
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      setToken(response.data.token); // Save the token in state
      alert(response.data.message); // Success message
      const role = response.data.user.role;
      localStorage.setItem("role", response.data.user.role); // Save role in localStorage
      localStorage.setItem("email", response.data.user.email); // Save role in localStorage

      // 🚀 Role-based redirect
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "residential") {
        // Call send-otp-login API before redirecting
        try {
          await axios.post(`${baseURL}/api/auth/send-otp-login`, { email });
          router.push("/otp");
        } catch (otpErr) {
          setError(otpErr.response?.data?.message || "Failed to send OTP email!");
          return;
        }
      } else if (role === "security") {
        router.push("/security/dashboard");
      } else {
        // Default fallback route
        router.push("/");
      }
      // Optionally, redirect to the dashboard or home page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  const signUpRedirect = () => {
    router.push("/register"); // Now this works properly
  };
  const verifyRedirect = () => {
    router.push("/verify"); // Now this works properly
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      {/* Logo & Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#00BFFF">
          <span style={{ color: "black" }}>Mygate</span>Update
        </Typography>
        <Typography variant="h5" mt={3}>
          Welcome back
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          Please enter your details
        </Typography>
      </Box>

      {/* Form */}
      <Box component="form" noValidate onSubmit={handleLogin}>
        <TextField
          fullWidth
          margin="normal"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username" // Add this line
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" // Add this line
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Remember for 30 days"
          />
          <Link href="#" onClick={verifyRedirect} fontSize={14}>
            Forgot password
          </Link>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ my: 2 }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Typography fontSize={14}>
          Don't have an account? <Link onClick={signUpRedirect}>Sign up</Link>
        </Typography>
      </Box>
    </Container>
  );
}
