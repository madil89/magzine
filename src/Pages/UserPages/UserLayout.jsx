import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import UserMagazine from '../../UserMagazine';
import UserRoutes from './UserRoutes';

import { loadMagazine } from '../../store/magazineSlice';

function UserLayout() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadMagazine());
  }, []);
  return loading ? <div>loading...</div> : (
    <div>
      <ResponsiveAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Routes>
          {UserRoutes.map((route) => (
            <Route key={route.id} exact path={route.path} element={<route.component />} />
          ))}
          <Route path="/" element={<UserMagazine />} />
        </Routes>
      </Box>
    </div>
  );
}

export default UserLayout;
