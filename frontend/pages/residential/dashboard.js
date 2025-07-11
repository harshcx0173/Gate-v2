import useRoleGuard from "@/hooks/useRoleGuard";
import ResidentialLayout from "@/components/layout/ResidentialLayout";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Container,
  AppBar,
  Toolbar,
  Stack,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Home,
  Build,
  People,
  CalendarToday,
  AccessTime,
  AccountCircle,
  Assignment,
  Receipt,
  Announcement,
  AttachMoney,
  ChevronRight,
  Warning,
  Notifications,
  WaterDrop,
  FitnessCenter,
  PendingActions,
  MonetizationOn,
  CalendarMonth,
  CheckCircle,
  Event,
  Groups,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import LiveTime from "@/components/liveTime";

const ResidentDashboard = () => {
  // Move all hooks to the top
  const isAuthorized = useRoleGuard("residential");
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Define all your data here (always executed)
  const stats = [
    { title: "Apartments", count: 1, icon: Home, color: "#1976d2" },
    { title: "Maintenance Dues", count: 1, icon: Build, color: "#ed6c02" },
    { title: "Tenants", count: 0, icon: People, color: "#9c27b0" },
  ];

  const todaysBookings = [];

  const rentPayments = [
    {
      id: 1,
      apartment: "103",
      userType: "Tenant",
      amount: 2882.05,
      date: "November 2021",
      status: "Unpaid",
    },
  ];

  const tickets = [
    {
      id: 1,
      ticketId: "85025899",
      type: "Owner",
      assignedTo: "Admin",
      status: "Open",
    },
    {
      id: 2,
      ticketId: "26400932",
      type: "Owner",
      assignedTo: "Linda Martinez",
      status: "Pending",
    },
    {
      id: 3,
      ticketId: "15276787",
      type: "Owner",
      assignedTo: "Jennifer Garcia",
      status: "Open",
    },
    {
      id: 4,
      ticketId: "12345678",
      type: "Owner",
      assignedTo: "John Doe",
      status: "Pending",
    },
    {
      id: 5,
      ticketId: "87654321",
      type: "Owner",
      assignedTo: "Jane Smith",
      status: "Open",
    },
  ];

  const utilityBills = [
    {
      id: 1,
      apartment: "103",
      billType: "Water Bill",
      amount: 243.44,
      date: "30 June 2025",
      status: "Unpaid",
    },
    {
      id: 2,
      apartment: "103",
      billType: "Water Bill",
      amount: 114.41,
      date: "24 June 2025",
      status: "Unpaid",
    },
    {
      id: 3,
      apartment: "103",
      billType: "Water Bill",
      amount: 415.7,
      date: "08 July 2025",
      status: "Unpaid",
    },
  ];

  const totalDues = 773.55;

  const notices = [
    { id: 1, title: "Annual General Meeting Notice", priority: "high" },
    {
      id: 2,
      title: "New Security Measures Implementation",
      priority: "medium",
    },
    { id: 3, title: "Green Initiative Program", priority: "low" },
    { id: 4, title: "Parking Policy Update", priority: "medium" },
  ];

  const totalDue = utilityBills.reduce((sum, bill) => sum + bill.amount, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const StatCard = ({
    stat,
    index,
    navigationPath,
    onHover,
    onLeave,
    isHovered,
  }) => {
    const navigate = useRouter();

    const handleTitleClick = (e) => {
      e.stopPropagation(); // Prevent the click from triggering parent elements
      if (navigationPath) {
        navigate.push(navigationPath);
      }
    };

    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          transition: "all 0.3s ease",
          "&:hover": {
            elevation: 2,
            transform: "translateY(-1px)",
          },
          boxShadow: isHovered
            ? "0px 4px 10px rgba(0,0,0,0.1)"
            : "0px 1px 3px rgba(0,0,0,0.05)",
          cursor: "pointer",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
        onMouseEnter={() => onHover && onHover(stat.title)}
        onMouseLeave={() => onLeave && onLeave()}
        onClick={() => setSelectedCard(index)}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "#f5f5f5", width: 40, height: 40 }}>
              <stat.icon sx={{ color: "#666", fontSize: 20 }} />
            </Avatar>
            <Box>
              <Typography variant="body1" color="#333" fontWeight={400}>
                {stat.title}
              </Typography>
              <Typography variant="h5" color="#333" fontWeight={600}>
                {stat.count}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  const DashboardCard = ({
    title,
    subtitle,
    children,
    action,
    alert,
    isEmpty = false,
    emptyIcon,
    emptyText,
  }) => (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              fontWeight={500}
              color="#333"
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="#999" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action && action}
        </Stack>
        {alert && <Box mb={2}>{alert}</Box>}

        {isEmpty ? (
          <Box textAlign="center" py={4}>
            <Avatar
              sx={{
                bgcolor: "#f5f5f5",
                width: 40,
                height: 40,
                mx: "auto",
                mb: 2,
              }}
            >
              {emptyIcon}
            </Avatar>
            <Typography
              variant="body1"
              color="#999"
              fontWeight={400}
              fontSize={14}
            >
              {emptyText}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxHeight: 320, overflowY: "auto" }}>{children}</Box>
        )}
      </CardContent>
    </Card>
  );

  // Handle loading state at the end of render
  if (!isAuthorized) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "#333",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600, color: "#333" }}
          >
            Dashboard
          </Typography>
          <LiveTime />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item size={{ xs: 12, md: 4, lg: 4 }} key={index}>
              <StatCard
                stat={stat}
                index={index}
                onHover={setHoveredCard}
                onLeave={() => setHoveredCard(null)}
                isHovered={hoveredCard === stat.title}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Dashboard Grid */}
        <Grid container spacing={3}>
          {/* Today's Bookings */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard
              title="Today's Bookings"
              subtitle="Thursday, 10 Jul 2025"
              isEmpty={todaysBookings.length === 0}
              emptyIcon={<Event sx={{ fontSize: 22, color: "#666" }} />}
              emptyText="No bookings found"
            />
          </Grid>

          {/* Rent Payments Due */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard
              title="Rent Payments Due"
              subtitle="Thursday, 10 Jul 2025"
              action={
                <Chip
                  label="1 Pending"
                  size="small"
                  sx={{
                    bgcolor: "#fff3e0",
                    color: "#f57c00",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              }
            >
              <List sx={{ p: 0 }}>
                {rentPayments.map((payment) => (
                  <ListItem
                    key={payment.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: "#fff",
                      border: "1px solid #e0e0e0",
                      p: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ bgcolor: "#ffebee", width: 40, height: 40 }}
                      >
                        <Receipt sx={{ fontSize: 20, color: "#f44336" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            color="#333"
                          >
                            {payment.apartment}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#666"
                            fontWeight={400}
                          >
                            {payment.userType}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 0.5 }}
                        >
                          <CalendarMonth sx={{ fontSize: 16, color: "#666" }} />
                          <Typography
                            variant="body2"
                            color="#666"
                            fontWeight={400}
                          >
                            {payment.date}
                          </Typography>
                        </Stack>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Stack alignItems="end" spacing={1}>
                        <Typography variant="h6" fontWeight={600} color="#333">
                          ₹{payment.amount.toLocaleString()}
                        </Typography>
                        <Chip
                          label={payment.status}
                          size="small"
                          sx={{
                            bgcolor: "#ffebee",
                            color: "#f44336",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </DashboardCard>
          </Grid>

          {/* Open and Pending Tickets */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard
              title="Open and Pending Tickets"
              action={
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`${
                      tickets.filter((t) => t.status === "Pending").length
                    } Pending`}
                    size="small"
                    sx={{
                      bgcolor: "#fff3e0",
                      color: "#f57c00",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Chip
                    label={`${
                      tickets.filter((t) => t.status === "Open").length
                    } Open`}
                    size="small"
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#f44336",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Stack>
              }
            >
              <Box
                sx={{
                  maxHeight: 320,
                  overflowY: "hidden",
                  "&:hover": {
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#c1c1c1",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#a8a8a8",
                    },
                  },
                }}
              >
                <List sx={{ p: 0 }}>
                  {tickets.map((ticket) => (
                    <ListItem
                      key={ticket.id}
                      sx={{
                        borderRadius: 2,
                        mb: 1.5,
                        bgcolor: "#fff",
                        border: "1px solid #e0e0e0",
                        p: 2.5,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                          bgcolor: "#fff",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                          border: "1px solid #d0d0d0",
                          "& .chevron-icon": {
                            opacity: 1,
                            visibility: "visible",
                          },
                        },
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pr: 3,
                      }}
                    >
                      {/* Left Section - Ticket Icon + Number + Owner */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              ticket.status === "Pending"
                                ? "#fff3e0"
                                : "#ffebee",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <Assignment
                            sx={{
                              fontSize: 24,
                              color:
                                ticket.status === "Pending"
                                  ? "#f57c00"
                                  : "#f44336",
                            }}
                          />
                        </Avatar>
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color="#000"
                            sx={{
                              fontSize: 16,
                              mb: 0.3,
                              lineHeight: 1.2,
                            }}
                          >
                            {ticket.ticketId}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="#6b7280"
                            fontWeight={400}
                            sx={{ fontSize: "0.875rem", lineHeight: 1.2 }}
                          >
                            {ticket.type}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Middle Section - User Icon + Admin Name */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AccountCircle
                          sx={{ fontSize: 16, color: "#9e9e9e" }}
                        />
                        <Typography
                          variant="body2"
                          color="#6b7280"
                          fontWeight={400}
                          sx={{ fontSize: "0.875rem", lineHeight: 1.2 }}
                        >
                          {ticket.assignedTo}
                        </Typography>
                      </Box>

                      {/* Right Section - Status + Chevron */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label={ticket.status}
                          size="small"
                          sx={{
                            bgcolor:
                              ticket.status === "Pending"
                                ? "#fff8e1"
                                : "#ffebee",
                            color:
                              ticket.status === "Pending"
                                ? "#f57c00"
                                : "#c62828",
                            fontWeight: 500,
                            fontSize: "0.8125rem",
                            height: "32px",
                            borderRadius: "8px",
                            "& .MuiChip-label": {
                              px: 2,
                              py: 0.5,
                            },
                          }}
                        />
                        <ChevronRight
                          className="chevron-icon"
                          sx={{
                            fontSize: 20,
                            color: "#c62828",
                            opacity: 0,
                            visibility: "hidden",
                            transition: "all 0.2s ease",
                          }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </DashboardCard>
          </Grid>

          {/* Utility Bills */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard
              title="Utility Bills Payments Due"
              action={
                <Chip
                  label={`₹${totalDue.toFixed(2)} Total Due`}
                  size="small"
                  sx={{
                    bgcolor: "#ffebee",
                    color: "#f44336",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              }
            >
              <List sx={{ p: 0 }}>
                {utilityBills.map((bill) => (
                  <ListItem
                    key={bill.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: "#fff",
                      border: "1px solid #e0e0e0",
                      p: 2,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ bgcolor: "#e3f2fd", width: 40, height: 40 }}
                      >
                        <WaterDrop sx={{ fontSize: 20, color: "#1976d2" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            color="#333"
                          >
                            {bill.apartment}
                          </Typography>
                          <Chip
                            label={bill.billType}
                            size="small"
                            sx={{
                              bgcolor: "#e3f2fd",
                              color: "#1976d2",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              height: "22px",
                            }}
                          />
                        </Stack>
                      }
                      secondary={
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 0.5 }}
                        >
                          <CalendarMonth sx={{ fontSize: 16, color: "#666" }} />
                          <Typography
                            variant="body2"
                            color="#666"
                            fontWeight={400}
                          >
                            {bill.date}
                          </Typography>
                        </Stack>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Stack alignItems="end" spacing={1}>
                        <Typography variant="h6" fontWeight={600} color="#333">
                          ₹{bill.amount}
                        </Typography>
                        <Chip
                          label={bill.status}
                          size="small"
                          sx={{
                            bgcolor: "#ffebee",
                            color: "#f44336",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </DashboardCard>
          </Grid>

          {/* Today's Visitors */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard
              title="Today's Visitors"
              subtitle="Thursday, 10 Jul 2025"
              isEmpty={true}
              emptyIcon={<Groups sx={{ fontSize: 22, color: "#666" }} />}
              emptyText="No visitors found"
            />
          </Grid>

          {/* Notices */}
          <Grid item size={{ xs: 12, lg: 6 }}>
            <DashboardCard title="Notices">
              <List sx={{ p: 0 }}>
                {notices.map((notice) => (
                  <ListItem
                    key={notice.id}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: "#fff",
                      border: "1px solid #e0e0e0",
                      p: 2,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ bgcolor: "#e3f2fd", width: 30, height: 30 }}
                      >
                        <Notifications
                          sx={{ fontSize: 18, color: "#1976d2" }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          color="#333"
                        >
                          {notice.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </DashboardCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ResidentDashboard.getLayout = (page) => (
  <ResidentialLayout>{page}</ResidentialLayout>
);

export default ResidentDashboard;
