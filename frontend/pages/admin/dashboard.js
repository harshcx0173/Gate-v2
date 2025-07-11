import AdminLayout from "@/components/layout/AdminLayout";

import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Link,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useMediaQuery,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  MessageSquare,
  HelpCircle,
  Coffee,
  Package,
  CreditCard,
  FileText,
  Settings,
  MenuIcon,
  ChevronDown,
  RefreshCw,
  HelpCircleIcon,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Building2,
  Home,
  Wrench,
  UserRound,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { useRouter, usePathname } from "next/navigation";
import useRoleGuard from "@/hooks/useRoleGuard";
import theme from "@/theme";
import LiveTime from "@/components/liveTime";
import axios from "axios";

// const [towerStats, setTowerStats] = useState({ totalTowers: 0, totalApartments: 0 });

// useEffect(() => {
//   const fetchTowerStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/towers");
//       const towers = res.data || [];

//       const totalTowers = towers.length;
//       const totalApartments = towers.reduce((sum, tower) => sum + (parseInt(tower.apartments) || 0), 0);

//       setTowerStats({ totalTowers, totalApartments });
//     } catch (err) {
//       console.error("Error fetching tower stats:", err);
//     }
//   };

//   fetchTowerStats();
// }, []);

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

// Create MUI theme

// Chart data
const labels = [
  "Aug 8",
  "Aug 9",
  "Aug 10",
  "Aug 11",
  "Aug 12",
  "Aug 13",
  "Aug 14",
];
const chartData = {
  labels,
  datasets: [
    {
      label: "Daily Help",
      data: [10, 20, 30, 25, 20, 15, 10],
      borderColor: "#4CAF50",
      backgroundColor: "rgba(76, 175, 80, 0.5)",
      tension: 0.3,
    },
    {
      label: "Society Staff",
      data: [5, 15, 10, 15, 10, 5, 0],
      borderColor: "#2196F3",
      backgroundColor: "rgba(33, 150, 243, 0.5)",
      tension: 0.3,
    },
    {
      label: "Delivery/Cabs",
      data: [15, 25, 20, 15, 10, 5, 0],
      borderColor: "#FF9800",
      backgroundColor: "rgba(255, 152, 0, 0.5)",
      tension: 0.3,
    },
    {
      label: "Total",
      data: [30, 60, 60, 55, 40, 25, 10],
      borderColor: "#9C27B0",
      backgroundColor: "rgba(156, 39, 176, 0.5)",
      tension: 0.3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Today's stats data
const stats = [
  { label: "Daily Help", value: 4, color: "#4CAF50" },
  { label: "Society Staff", value: 0, color: "#2196F3" },
  { label: "Delivery/Cabs", value: 2, color: "#FF9800" },
  { label: "Total", value: 8, color: "#9C27B0" },
];

// Defaulters data
const defaulters = [
  { name: "Teekshant", flat: "A-101", amount: "₹ 10,42,937" },
  { name: "Amit Singh", flat: "A-007", amount: "₹ 8,77,251" },
  { name: "Kriya", flat: "A-36", amount: "₹ 6,26,790" },
];

// Helpdesk tickets data
const tickets = [
  { category: "Shapes", count: 5, color: "#FF9800", percentage: 5 },
  { category: "Yoga class", count: 10, color: "#2196F3", percentage: 10 },
  { category: "Pro-glass", count: 15, color: "#4CAF50", percentage: 15 },
  { category: "Electrical", count: 615, color: "#9C27B0", percentage: 60 },
  { category: "Water pipe", count: 5, color: "#E91E63", percentage: 5 },
];

const assignees = [
  { name: "Unassigned", count: 615 },
  { name: "Bindu", count: 21 },
  { name: "Staff 1", count: 1 },
  { name: "Rajesh", count: 96 },
];

const StatCard = ({
  icon,
  title,
  value,
  hoverState,
  setHoverState,
  navigationPath,
}) => {
  const isHovered = hoverState === title;

  const navigate = useRouter();

  const handleTitleClick = (e) => {
    e.stopPropagation(); // Prevent the click from triggering parent elements
    if (navigationPath) {
      navigate.push(navigationPath);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: isHovered
          ? "0px 4px 10px rgba(0,0,0,0.1)"
          : "0px 1px 3px rgba(0,0,0,0.05)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHoverState(title)}
      onMouseLeave={() => setHoverState(null)}
      onClick={handleTitleClick}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "medium",
            color: isHovered ? "primary.main" : "text.primary",
            transition: "color 0.2s ease",
          }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 0.5 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  // const isAuthorized = useRoleGuard("admin");
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [hoveredCard, setHoveredCard] = useState(null);

  // Use window prop if provided (for demo purposes)
  // const demoWindow = window ? window() : undefined;
  // const router = useMyGateRouter('/dashboard');

  const [topstats, setStats] = useState({
    totalTowers: 0,
    totalApartments: 0,
    unsoldApartments: 0,
    owners: 0,
    tenants: 0,
    maintenanceDues: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard stats fetch error:", err));
  }, []);

  console.log("topstats", topstats);

  // if (!isAuthorized) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="100vh"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // backgroundColor: "transparent",
          // backgroundColor: "#fff",
          borderRadius: 2,
          mb: 2,
          p: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold" textTransform="uppercase">
          Dashboard
        </Typography>
        <LiveTime />
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<Building2 size={20} color="#666" />}
            title="Tower"
            value={topstats.totalTowers}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
            navigationPath="/admin/towers"
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<Home size={20} color="#666" />}
            title="Apartments"
            value={topstats.totalApartments}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<Home size={20} color="#666" />}
            title="Unsold Apartments"
            value={topstats.unsoldApartments}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<Wrench size={20} color="#666" />}
            title="Maintenance Dues"
            value={topstats.maintenanceDues}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<UserRound size={20} color="#666" />}
            title="Owner"
            value={topstats.owners}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 4, lg: 3 }}>
          <StatCard
            icon={<UserRound size={20} color="#666" />}
            title="Tenant"
            value={topstats.tenants}
            hoverState={hoveredCard}
            setHoverState={setHoveredCard}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        // sx={{ mt: 2, px: isSmUp ? 2 : 2, pt: 1, pb: 3 }}
      >
        {/* Left Column */}
        <Grid item size={{ xs: 12, md: 8 }}>
          {/* Visitors Chart */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  VISITORS
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: "#4CAF50",
                            "&.Mui-checked": { color: "#4CAF50" },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">Daily Help</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: "#2196F3",
                            "&.Mui-checked": { color: "#2196F3" },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">Society Staff</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: "#FF9800",
                            "&.Mui-checked": { color: "#FF9800" },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2">Delivery/Cabs</Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: "#9C27B0",
                            "&.Mui-checked": { color: "#9C27B0" },
                          }}
                        />
                      }
                      label={<Typography variant="body2">Total</Typography>}
                    />
                  </FormGroup>
                  <IconButton size="small">
                    <RefreshCw size={16} />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ height: 250, width: "100%" }}>
                <Line options={chartOptions} data={chartData} />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1 }}
              >
                Visitor Count in Last 7 Days
              </Typography>
            </Box>
          </Paper>

          {/* Rest of the dashboard content remains the same */}
          {/* Helpdesk Tickets */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              mb: 0,
            }}
          >
            {/* Content unchanged */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  HELPDESK
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Link
                    href="#"
                    underline="none"
                    sx={{ fontSize: "0.875rem", color: "#e94e4e" }}
                  >
                    View All
                  </Link>
                  <RefreshCw size={16} />
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Tickets
                  </Typography>
                  {tickets.map((ticket) => (
                    <Box key={ticket.category} sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2">
                          {ticket.category}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={ticket.percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#f0f0f0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: ticket.color,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Assignee
                  </Typography>
                  {assignees.map((assignee) => (
                    <Box
                      key={assignee.name}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                        p: 1,
                        borderRadius: 1,
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <Typography variant="body2">{assignee.name}</Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {assignee.count}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item size={{ xs: 12, md: 4 }}>
          {/* Safe Entries */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              mb: 3,
            }}
          >
            {/* Content unchanged */}
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Safe Entries
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Society Safety ensured with Mandatory mask checks and
                    temperature screening
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    (*Data For Previous Month)
                  </Typography>
                </Box>

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={60}
                    size={60}
                    thickness={5}
                    sx={{ color: "#4CAF50" }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.primary"
                    >
                      60%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Today Stats */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              mb: 3,
            }}
          >
            {/* Content unchanged */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Today
                </Typography>
                <RefreshCw size={16} />
              </Box>

              <Grid container spacing={2}>
                {stats.map((stat) => (
                  <Grid item xs={12} key={stat.label}>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <Typography
                        variant="h4"
                        fontWeight="medium"
                        sx={{ color: stat.color }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>

          {/* Defaulters Table */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              mb: 3,
            }}
          >
            {/* Content unchanged */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  DEFAULTERS
                </Typography>
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontSize: "0.875rem", color: "#e94e4e" }}
                >
                  View All
                </Link>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                        }}
                      >
                        Flat
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                        }}
                      >
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {defaulters.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell
                          sx={{ borderBottom: "none", padding: "4px 8px" }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", padding: "4px 8px" }}
                        >
                          {row.flat}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ borderBottom: "none", padding: "4px 8px" }}
                        >
                          {row.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 1,
                  borderTop: "1px solid #eee",
                }}
              >
                <Typography variant="body2" fontWeight="medium">
                  TOTAL
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  1016
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Security Messages */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            {/* Content unchanged */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  SECURITY MESSAGES
                </Typography>
                <Link
                  href="#"
                  underline="none"
                  sx={{ fontSize: "0.875rem", color: "#e94e4e" }}
                >
                  View All
                </Link>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Alerts Received in Last 7 Days
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

Dashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
