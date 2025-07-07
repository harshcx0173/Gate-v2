"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const baseURL =
  typeof window !== "undefined" && window.location.hostname === "192.168.1.38"
    ? "http://192.168.1.38:8000"
    : "http://localhost:8000";

export default function ApprovalPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/auth/admin/pending-users`);
      setUsers(res.data); // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const res = await axios.patch(
        `${baseURL}/api/auth/admin/approve-user/${userId}`
      );
      if (res.status === 200) {
        showToast("User Approved!", "success");
        fetchPendingUsers(); // 👈 Refetch list after approval
      }
    } catch (error) {
      console.error("Approval failed:", error);
      showToast("Failed to approve user.", "error");
    }
  };

  const handleDecline = async (userId) => {
    try {
      const res = await axios.patch(`${baseURL}/api/auth/admin/decline-user/${userId}`);
      if (res.status === 200) {
        showToast("User Declined", "info");
        fetchPendingUsers(); // Refresh list after decline
      }
    } catch (error) {
      console.error("Decline failed:", error);
      showToast("Failed to decline user", "error");
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
      {users.length === 0 ? (
        <Typography color="success" sx={{ color: "primary" }}>
          No Pending Approvals
        </Typography>
      ) : (
        users.map((user) => (
          <Card
            key={user._id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 2,
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            <Avatar
              alt={user.fullName}
              src={user.profilePic || "/default-avatar.png"}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {user.email}
              </Typography>
            </Box>
            <CardActions sx={{ flexDirection: "row", gap: 1, p: 0 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(user._id)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDecline(user._id)}
              >
                Decline
              </Button>
            </CardActions>
          </Card>
        ))
      )}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
