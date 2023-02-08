import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  NavLink, Route, Routes,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import adminRoutes from './adminRoutes';
import SignInPage from '../SignInPage';
import AdminAppBar from '../../components/AdminAppBar';
import { loadMagazine } from '../../store/magazineSlice';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const auth = getAuth();

    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setShowLogin(false);
        dispatch(loadMagazine());
      } else {
        setShowLogin(true);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminAppBar />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {adminRoutes.map((route) => !route.hidden && (
            <NavLink
              key={route.name}
              to={`/admin${route.path}`}
              end
              style={{ textDecoration: 'none', color: theme.palette.text.primary }}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      marginLeft: '15px',
                      verticalAlign: 'middle',
                      width: '20px',
                      height: '20px',
                      marginTop: '-3px',
                      top: '0px',
                      position: 'relative',
                    }}
                  >
                    <route.icon />
                  </ListItemIcon>

                </ListItemButton>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>{route.name}</Typography>
              </ListItem>
            </NavLink>

          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {showLogin ? <SignInPage />
          : (
            <Routes>
              {adminRoutes.map((route) => (
                <Route key={route.path} exact path={route.path} element={<route.component />} />
              ))}
            </Routes>
          )}
      </Box>
    </Box>
  );
}
