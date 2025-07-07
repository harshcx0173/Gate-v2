import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Drawer,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
  Help as HelpIcon,
  EventNote as EventNoteIcon,
  Inventory as InventoryIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      },
    }),
    ...(!open && {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
      '& .MuiDrawer-paper': {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
    }),
  }),
);

const MenuItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: '8px',
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1),
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const menuItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { name: 'Society', icon: <PeopleIcon />, path: '/admin/society' },
  { name: 'People Hub', icon: <GroupIcon />, path: '/admin/people-hub' },
  { name: 'Communications', icon: <ChatIcon />, path: '/admin/communications' },
  { name: 'Help Desk', icon: <HelpIcon />, path: '/admin/help-desk' },
  { name: 'Amenities', icon: <EventNoteIcon />, path: '/admin/amenities' },
  { name: 'Assets & Inventory', icon: <InventoryIcon />, path: '/admin/assets' },
  { name: 'Accounts', icon: <AccountBalanceIcon />, path: '/admin/accounts' },
  { name: 'Financial Reports', icon: <AssessmentIcon />, path: '/admin/financial-reports' },
  { name: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto collapse on mobile
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0} 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1, 
          borderBottom: '1px solid #eaeaea',
          backgroundColor: 'white'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
          }}>
            <Box sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: '#F87171', 
              borderRadius: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mr: 1
            }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>M</Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
              MyGate Update
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>MyGate Dev</Typography>
            <ArrowDropDownIcon />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#F87171', width: 32, height: 32 }}>A</Avatar>
            <Box sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2">Ankitha</Typography>
              <Typography variant="caption" color="textSecondary">Society Admin</Typography>
            </Box>
            <ArrowDropDownIcon />
          </Box>
        </Toolbar>
      </AppBar>
      
      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader />
        <List style={{paddingRight:'16px'}}>
          {menuItems.map((item, index) => (
            <Link href={item.path} key={item.name} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tooltip title={open ? "" : item.name} placement="right" arrow>
                <MenuItem
                  button
                  active={router.pathname === item.path ? 1 : 0}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </MenuItem>
              </Tooltip>
            </Link>
          ))}
        </List>
      </StyledDrawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}