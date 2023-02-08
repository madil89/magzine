// import './App.css';
import Container from '@mui/material/Container';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import PreviousMagazine from './components/PreviousMagazine';
import CurrentMagazine from './components/CurrentMagazine';

function UserMagazine() {
  const magazines = useSelector((state) => state.magazine);
  const navigate = useNavigate();
  return (
    <div>
      <Container maxWidth="xlg">
        <CurrentMagazine />
        {/* <EditorNote /> */}
        <Typography variant="h4" sx={{ marginTop: 10 }}>
          Previous Magazines
        </Typography>
        <PreviousMagazine resource={magazines} onSelected={(magazineId) => navigate(`/magazines/${magazineId}`)} />
      </Container>

    </div>
  );
}

export default UserMagazine;
