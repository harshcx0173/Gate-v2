"use client";

import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  Tooltip,
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
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#e94e4e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: "#f5f5f5",
            color: "#e94e4e",
            "& .MuiListItemIcon-root": {
              color: "#e94e4e",
            },
          },
        },
      },
    },
  },
});

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const expandedDrawerWidth = 240;
  const collapsedDrawerWidth = 70;
  const drawerWidth = sidebarExpanded
    ? expandedDrawerWidth
    : collapsedDrawerWidth;

  const router = useRouter();
  const pathname = usePathname ? usePathname() : "";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebarExpansion = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/login");
    localStorage.clear();
  };

  const handleMouseEnter = (item) => {
    if (!sidebarExpanded) {
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMenuItemClick = (path) => {
    if (router) {
      router.push(path);
    }
  };

  // Sidebar menu items with paths
  const menuItems = [
    {
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    { text: "Society", icon: <Users size={20} />, path: "/admin/society" },
    {
      text: "People Hub",
      icon: <UserCircle size={20} />,
      path: "/admin/people-hub",
    },
    {
      text: "Communications",
      icon: <MessageSquare size={20} />,
      path: "/admin/communications",
    },
    {
      text: "Help Desk",
      icon: <HelpCircle size={20} />,
      path: "/admin/help-desk",
    },
    { text: "Amenities", icon: <Coffee size={20} />, path: "/admin/amenities" },
    {
      text: "Assets & Inventory",
      icon: <Package size={20} />,
      path: "/admin/assets-inventory",
    },
    {
      text: "Accounts",
      icon: <CreditCard size={20} />,
      path: "/admin/accounts",
    },
    {
      text: "Financial Reports",
      icon: <FileText size={20} />,
      path: "/admin/financial-reports",
    },
    { text: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  // Check if a menu item is selected based on the current path
  const isSelected = (path) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Sidebar drawer content
  const drawer = (
    <div>
      <Toolbar
        sx={{
          px: sidebarExpanded ? 2 : 1,
          justifyContent: sidebarExpanded ? "space-between" : "center",
        }}
      >
        {sidebarExpanded ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#e94e4e",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  M
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                MyGate
              </Typography>
              <HelpCircleIcon
                size={16}
                style={{ marginLeft: 4, color: "#ccc" }}
              />
            </Box>
            <IconButton onClick={toggleSidebarExpansion}>
              <ChevronLeft size={20} />
            </IconButton>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#e94e4e",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                M
              </Typography>
            </Box>
            <IconButton
              onClick={toggleSidebarExpansion}
              sx={{ position: "absolute", right: 8 }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </>
        )}
      </Toolbar>
      <List sx={{ px: sidebarExpanded ? 2 : 1 }}>
        {menuItems.map((item) => {
          const isItemSelected = isSelected(item.path);
          const isItemHovered = hoveredItem === item.text;

          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                mb: 0.5,
                position: "relative",
                display: "block",
              }}
              onMouseEnter={() => handleMouseEnter(item.text)}
              onMouseLeave={handleMouseLeave}
            >
              <Tooltip
                title={!sidebarExpanded && !isItemHovered ? item.text : ""}
                placement="right"
                disableHoverListener={sidebarExpanded || isItemHovered}
              >
                <ListItemButton
                  selected={isItemSelected}
                  sx={{
                    borderRadius: 1,
                    minHeight: 48,
                    justifyContent: sidebarExpanded ? "initial" : "center",
                    px: sidebarExpanded ? 2.5 : 2,
                  }}
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: sidebarExpanded ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected ? "#e94e4e" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: sidebarExpanded ? 1 : 0,
                      display: sidebarExpanded ? "block" : "none",
                    }}
                  />
                </ListItemButton>
              </Tooltip>

              {/* Hover popup for collapsed sidebar */}
              {!sidebarExpanded && isItemHovered && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "100%",
                    top: 0,
                    zIndex: 1300,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 1,
                    minWidth: 150,
                    py: 1,
                  }}
                >
                  <Typography sx={{ px: 2, py: 1 }}>{item.text}</Typography>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            transition: "width 0.2s ease",
          }}
          aria-label="mailbox folders"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: expandedDrawerWidth,
                transition: "width 0.2s ease",
                width: "320px",
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
                transition: "width 0.2s ease",
                overflowX: "hidden",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#f5f5f5",
            transition: "width 0.2s ease, margin 0.2s ease",
          }}
        >
          {/* Header */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              backgroundColor: "background.paper",
              mb: 2,
              mr: isSmUp ? 2 : 0,
              // p: isSmUp ? 2 : 0,
              px: isSmUp ? 2 : 2,
            }}
          >
            <Toolbar
              sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}
            >
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="text"
                  endIcon={<ChevronDown size={16} />}
                  onClick={handleMenuClick}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    fontWeight: "medium",
                    fontSize: "0.9rem",
                  }}
                >
                  MyGate Dev
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>MyGate Dev</MenuItem>
                  <MenuItem onClick={handleClose}>MyGate Prod</MenuItem>
                </Menu>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton size="small" sx={{ display: "none" }}>
                  <Avatar
                    sx={{
                      bgcolor: "#f5f5f5",
                      color: "#999",
                      width: 32,
                      height: 32,
                    }}
                  >
                    ?
                  </Avatar>
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleUserMenuClick}
                >
                  <Avatar sx={{ bgcolor: "#e94e4e", width: 36, height: 36 }}>
                    A
                  </Avatar>
                  <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{
                        fontWeight: "medium",
                        lineHeight: 1.2,
                        fontWeight: "600",
                      }}
                    >
                      Admin
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ lineHeight: 1.2 }}
                    >
                      Society Admin
                    </Typography>
                  </Box>
                  <ChevronDown
                    size={16}
                    color="#e94e4e"
                    style={{ marginLeft: 4 }}
                  />
                </Box>
                <Menu
                  anchorEl={userAnchorEl}
                  open={Boolean(userAnchorEl)}
                  onClose={handleUserClose}
                  sx={{ width: "100%" }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        minWidth: "180px",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleUserClose}>Profile</MenuItem>
                  <MenuItem onClick={handleUserClose}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Box sx={{ mt: 2, px: isSmUp ? 2 : 2, pt: 1, pb: 3 }}>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
