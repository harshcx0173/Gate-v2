import AdminLayout from "@/components/layout/AdminLayout";
// import NotificationSound from "../../src/audio/notification-audio.mp3"
import {
  Box,
  Stack,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Checkbox,
  Grid,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Fade,
} from "@mui/material";
import {
  Plus,
  Trash2,
  PencilLine,
  Download,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // ✅ ADD THIS LINE

const baseURL =
  typeof window !== "undefined" && window.location.hostname === "192.168.1.38"
    ? "https://gate-v2.onrender.com"
    : "https://gate-v2.onrender.com";

const TowersPage = () => {
  // console.log(NotificationSound)
  const [towersData, setTowersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [towerDrawerOpen, setTowerDrawerOpen] = useState(false);
  const [towerName, setTowerName] = useState("");
  const [apartments, setApartments] = useState("");
  const [error, setError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // New states for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [towerToDelete, setTowerToDelete] = useState(null);

  // Notification states
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success", // success, error, info, warning
  });

  // Notification timeout ID for cleanup
  const [notificationTimeout, setNotificationTimeout] = useState(null);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const socket = io(baseURL);

  //   // socket.on("towerDeleted", (data) => {
  //   //   showNotification(`🗑️ ${data.name} deleted (via real-time)`, "success");
  //   //   fetchTowers();
  //   // });

  //   socket.on("towerDeleted", (data) => {
  //     new Audio("/notification-audio.mp3").play(); // ⬅️ Put file in public folder
  //     showNotification(`🗑️ ${data.name} deleted (via real-time)`, "success");
  //     fetchTowers();
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const filteredTowers = towersData.filter((tower) =>
    tower.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = filteredTowers.map((tower) => tower._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const toggleTowerDrawerDrawer = (newOpen) => () => {
    setTowerDrawerOpen(newOpen);
    if (!newOpen) {
      // reset form
      setTowerName("");
      setApartments("");
      setEditMode(false);
      setEditId(null);
    }
  };

  const handleSave = async () => {
    if (!towerName.trim()) {
      setError(true);
      return;
    }

    try {
      if (editMode && editId) {
        // Update request
        const response = await axios.put(`${baseURL}/api/towers/${editId}`, {
          name: towerName,
          apartments,
        });

        if (response.status === 200) {
          console.log("Tower updated");
        }
      } else {
        // Create request
        const response = await axios.post(`${baseURL}/api/towers`, {
          name: towerName,
          apartments,
        });

        if (response.status === 201) {
          console.log("Tower created");
        }
      }

      fetchTowers();
      toggleTowerDrawerDrawer(false)();
    } catch (error) {
      console.error("Error saving tower:", error);
    }
  };

  const fetchTowers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/towers`);
      setTowersData(res.data || []);
    } catch (err) {
      console.error("Error fetching towers:", err);
    }
    setLoading(false);
  };

  // Open the delete confirmation dialog
  const openDeleteDialog = (tower) => {
    setTowerToDelete(tower);
    setDeleteDialogOpen(true);
  };

  // Close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTowerToDelete(null);
  };

  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!towerToDelete) return;

    try {
      // Delete the tower and all related data
      await axios.delete(`${baseURL}/api/towers/${towerToDelete._id}`);

      // Show success notification
      showNotification(
        `${towerToDelete.name} has been deleted from your Society`
      );

      fetchTowers();
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting tower:", error);

      // Show error notification
      showNotification(`Failed to delete tower: ${error.message}`, "error");
    }
  };

  // Handle closing the notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });

    // Clear any existing timeout to avoid memory leaks
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(null);
    }
  };

  // Show notification with auto-close
  const showNotification = (message, type = "success") => {
    // Clear any existing timeout
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    // Set notification content
    setNotification({
      open: true,
      message,
      type,
    });

    // Auto close after 4 seconds
    const timeoutId = setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 4000);

    setNotificationTimeout(timeoutId);
  };

  const handleUpdateClick = (tower) => {
    setTowerName(tower.name);
    setApartments(tower.apartments);
    setEditId(tower._id);
    setEditMode(true);
    setTowerDrawerOpen(true);
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [notificationTimeout]);

  // ✅ Ask for permission once
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          console.log("Notification permission:", permission);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const socket = io(baseURL);

    socket.on("towerDeleted", (data) => {
      new Audio("/splash-effect-229315.mp3").play();
      fetchTowers();

      if (Notification.permission === "granted") {
        new Notification("Tower Deleted", {
          body: `${data.name} has been deleted from your society.`,
          icon: "/favicon.ico", // Optional icon
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchTowers();
  }, []);

  const towerDrawerList = (
    <Box p={3} sx={{ width: { xs: "100%", sm: "450px" }, maxWidth: "100%" }}>
      <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
        {editMode ? "Update Tower" : "Add Tower"}
      </Typography>

      <Box mb={3}>
        <Typography mb={1} component="label" htmlFor="tower-name">
          Tower Name{" "}
          <Typography component="span" color="error">
            *
          </Typography>
        </Typography>
        <TextField
          id="tower-name"
          fullWidth
          value={towerName}
          onChange={(e) => {
            setTowerName(e.target.value);
            if (e.target.value.trim()) setError(false);
          }}
          error={error}
          variant="outlined"
          placeholder="Enter tower name"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </Box>
      <Box mb={3}>
        <Typography mb={1} component="label" htmlFor="tower-apartments">
          Number of Apartments
        </Typography>
        <TextField
          id="tower-apartments"
          type="text"
          fullWidth
          value={apartments}
          onChange={(e) => {
            setApartments(e.target.value);
          }}
          variant="outlined"
          placeholder="Enter number of apartments"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </Box>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#e11d48",
            "&:hover": { backgroundColor: "#be123c" },
            textTransform: "none",
            fontWeight: 500,
            borderRadius: "8px",
            px: 4,
          }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={toggleTowerDrawerDrawer(false)}
          sx={{
            textTransform: "none",
            color: "#4b5563",
            borderColor: "#d1d5db",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
            fontWeight: 500,
            borderRadius: "8px",
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );

  // Custom Delete Confirmation Dialog
  const deleteConfirmationDialog = (
    <Dialog
      open={deleteDialogOpen}
      onClose={closeDeleteDialog}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "16px",
        },
      }}
    >
      <Box sx={{ p: 2, pb: 0 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              backgroundColor: "#fee2e2",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={24} color="#ef4444" />
          </Box>
          <DialogTitle sx={{ p: 0, fontWeight: "bold" }}>
            Delete Tower ?
          </DialogTitle>
        </Box>

        <DialogContent sx={{ px: 0 }}>
          <Typography variant="body1" mb={2}>
            You will not be able to recover the deleted record!
          </Typography>

          <Alert
            severity="error"
            icon={<AlertCircle size={20} />}
            sx={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              "& .MuiAlert-icon": {
                color: "#b91c1c",
              },
            }}
          >
            If you delete this tower, all related floors and apartments will
            also be permanently deleted.
          </Alert>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", p: 0, my: 2 }}>
          <Button
            onClick={closeDeleteDialog}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#4b5563",
              borderColor: "#d1d5db",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
              fontWeight: 500,
              borderRadius: "8px",
              px: 3,
            }}
          >
            CANCEL
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": { backgroundColor: "#dc2626" },
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "8px",
              px: 3,
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

  // Custom WhatsApp/Skype like notification component
  const customNotification = (
    <Fade in={notification.open}>
      <Box
        sx={{
          position: "fixed",
          zIndex: 9999,
          right: "20px",
          top: "20px",
          maxWidth: "350px",
          width: "calc(100% - 40px)",
          backgroundColor:
            notification.type === "error" ? "#fff0f0" : "#effaf3",
          border:
            notification.type === "error"
              ? "1px solid #ffcdd2"
              : "1px solid #a7f3d0",
          borderRadius: "12px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          padding: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          animation: "slideIn 0.3s ease-out forwards",
          "@keyframes slideIn": {
            from: { transform: "translateX(100%)", opacity: 0 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        }}
      >
        <Box
          sx={{
            backgroundColor:
              notification.type === "error" ? "#fee2e2" : "#d1fae5",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            minWidth: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: notification.type === "error" ? "#ef4444" : "#10b981",
          }}
        >
          {notification.type === "error" ? (
            <AlertCircle size={22} />
          ) : (
            <CheckCircle size={22} />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{
              color: notification.type === "error" ? "#b91c1c" : "#047857",
              fontSize: "16px",
              mb: 0.5,
            }}
          >
            {notification.type === "error" ? "Error" : "Success"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: notification.type === "error" ? "#b91c1c" : "#047857",
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            {notification.message}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={handleCloseNotification}
          sx={{
            color: notification.type === "error" ? "#b91c1c" : "#047857",
            padding: "4px",
            "&:hover": {
              backgroundColor:
                notification.type === "error"
                  ? "rgba(220, 38, 38, 0.1)"
                  : "rgba(16, 185, 129, 0.1)",
            },
          }}
        >
          <X size={16} />
        </IconButton>
      </Box>
    </Fade>
  );

  return (
    <>
      <Box>
        <Typography variant="h5" component="h1" fontWeight="bold" mb={3}>
          Tower
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2 }}
        >
          <Grid item size={{ xs: 12, md:6, lg: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search towers by tower name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "40px",
                },
              }}
            />
          </Grid>
          <Grid
            item
            size={{ xs: 12, md:6, lg: 8 }}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<Download size={18} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 2,
                  height: "40px",
                }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                onClick={toggleTowerDrawerDrawer(true)}
                sx={{
                  backgroundColor: "#e11d48",
                  "&:hover": { backgroundColor: "#be123c" },
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 3,
                  height: "40px",
                }}
              >
                Add
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredTowers.length
                    }
                    checked={
                      filteredTowers.length > 0 &&
                      selected.length === filteredTowers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Tower Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  No. of Apartment
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTowers.length > 0 ? (
                filteredTowers.map((tower) => {
                  const isItemSelected = isSelected(tower._id);
                  return (
                    <TableRow key={tower._id} hover selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={() => handleSelect(tower._id)}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {tower.name}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center", fontSize: "0.875rem" }}
                      >
                        {tower.apartments || 0}
                      </TableCell>
                      <TableCell sx={{ textAlign: "right" }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<PencilLine size={16} />}
                            onClick={() => handleUpdateClick(tower)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 500,
                              borderRadius: "8px",
                              color: "#4b5563",
                              borderColor: "#d1d5db",
                              "&:hover": {
                                borderColor: "#9ca3af",
                                backgroundColor: "#f9fafb",
                              },
                            }}
                          >
                            UPDATE
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(tower)}
                            sx={{
                              backgroundColor: "#ef4444",
                              color: "white",
                              "&:hover": { backgroundColor: "#dc2626" },
                              borderRadius: "8px",
                              padding: "8px",
                              minWidth: "36px",
                            }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      fontWeight="bold"
                    >
                      No Tower Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Tower Edit/Add Drawer */}
      <Drawer
        open={towerDrawerOpen}
        onClose={toggleTowerDrawerDrawer(false)}
        anchor="right"
      >
        {towerDrawerList}
      </Drawer>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmationDialog}

      {/* Custom WhatsApp/Skype style notification */}
      {customNotification}
    </>
  );
};

TowersPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default TowersPage;
