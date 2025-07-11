"use client";

// pages/register.js
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useRouter } from "next/router";

export default function SecurityRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState('');  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname.includes('security')) {
      setRole('security');  // Set role as 'security' if URL has /security
    //   localStorage.setItem('role', 'security');  // Save role in localStorage
    } else {
      setRole('residential');  // Default role if not security
    //   localStorage.setItem('role', 'residential');  // Save role in localStorage
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("Please agree to terms and conditions.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          fullName,
          email,
          password,
          role,
        }
      );
      alert(response.data.message);
      router.push("/login");
      // Redirect if needed
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const loginRedirect = () => {
    router.push("/login"); // Now this works properly
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, textAlign: "center" }}>
      {/* Logo & Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#00BFFF">
          <span style={{ color: "black" }}>Mygate</span>Update
        </Typography>
        <Typography variant="h5" mt={3}>
          Create an account for Security
        </Typography>
        <Typography color="text.secondary" fontSize={14}>
          Enter your info to get started
        </Typography>
      </Box>

      {/* Form */}
      <Box component="form" noValidate onSubmit={handleRegister}>
        <TextField
          fullWidth
          margin="normal"
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"  // Add this line
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"  // Add this line
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
          }
          label="I agree to terms and conditions"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={!agreeTerms || loading} // Disabled unless checkbox is ticked
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2 }}
        >
          Sign up with Google
        </Button>

        <Typography fontSize={14}>
          Already have an account? <Link onClick={loginRedirect}>Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
}
