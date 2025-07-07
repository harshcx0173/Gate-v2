"use client";

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
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hardcoded credentials
  const validEmail = "admin@society.com";
  const validPassword = "Admin@123";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    // Simulate login logic
    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        alert("Login successful!");
        localStorage.setItem("role", "admin"); 
        router.push("/admin/aproval");
      } else {
        setError("Invalid credentials!");
      }
      setLoading(false);
    }, 1000); // Simulate network delay
  };

  const signUpRedirect = () => {
    router.push("/register");
  };

  const verifyRedirect = () => {
    router.push("/verify");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      {/* Logo & Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#00BFFF">
          <span style={{ color: "black" }}>Mygate</span>Update
        </Typography>
        <Typography variant="h5" mt={3}>
          Welcome Admin
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
          autoComplete="username"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Box
          display="none"
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
          sx={{ my: 2, bgcolor: "#00D5FF" }}
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
      </Box>
    </Container>
  );
}
