"use client";

// pages/register.js
import { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import ApartmentIcon from "@mui/icons-material/Apartment";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("residential");
  const [residentType, setResidentType] = useState("owner");
  const [towerName, setTowerName] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // For multi-step form (1: account details, 2: residence details)
  const [availableTowers, setAvailableTowers] = useState([]);

  const router = useRouter();

  const validateFirstStep = () => {
    if (!email || !password || !fullName) {
      setError("Please fill all required fields");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateFirstStep()) {
      setError("");
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      setError("Please agree to terms and conditions.");
      return;
    }

    if (!towerName || !flatNumber || !phoneNumber) {
      setError("Please fill all residence details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://gate-v2.onrender.com/api/auth/register",
        {
          fullName,
          email,
          password,
          role,
          residentType,
          towerName,
          flatNumber,
          phoneNumber
        }
      );
      alert(response.data.message);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch towers from API
  useEffect(() => {
    const fetchTowers = async () => {
      try {
        const response = await axios.get("https://gate-v2.onrender.com/api/towers");
        setAvailableTowers(response.data);
        // console.log(availableTowers)
      } catch (error) {
        console.error("Failed to fetch towers:", error);
        setError("Failed to load towers. Please refresh the page.");
      }
    };

    fetchTowers();
  }, []);

  const loginRedirect = () => {
    router.push("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Logo & Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            <span style={{ color: "black" }}>Mygate</span>Update
          </Typography>
          <Typography variant="h5" mt={3}>
            Create an account
          </Typography>
          <Typography color="text.secondary" fontSize={14}>
            {step === 1 ? "Enter your account details" : "Enter your residence details"}
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" noValidate onSubmit={handleRegister}>
          {step === 1 ? (
            /* Step 1: Account Details */
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleNextStep}
              >
                Next
              </Button>
            </>
          ) : (
            /* Step 2: Residence Details */
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>I am a</InputLabel>
                <Select
                  value={residentType}
                  label="I am a"
                  onChange={(e) => setResidentType(e.target.value)}
                >
                  <MenuItem value="owner">Owner</MenuItem>
                  <MenuItem value="tenant">Tenant</MenuItem>
                  <MenuItem value="family">Family Member</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Tower Name</InputLabel>
                <Select
                  value={towerName}
                  label="Tower Name"
                  onChange={(e) => setTowerName(e.target.value)}
                  required
                >
                  {availableTowers.map((tower) => (
                    <MenuItem key={tower._id} value={tower._id}>
                      {tower.name} 
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                margin="normal"
                label="Flat Number"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
                required
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

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  sx={{ flex: 1 }}
                  onClick={handlePrevStep}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  sx={{ flex: 1 }}
                  type="submit"
                  disabled={!agreeTerms || loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </Box>
            </>
          )}

          {error && (
            <Typography color="error" mt={2} textAlign="center">
              {error}
            </Typography>
          )}

          {step === 1 && (
            <>
              <Divider sx={{ my: 2 }}>or</Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ mb: 2 }}
              >
                Sign up with Google
              </Button>
            </>
          )}

          <Typography fontSize={14} textAlign="center" mt={2}>
            Already have an account? <Link onClick={loginRedirect}>Sign in</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}