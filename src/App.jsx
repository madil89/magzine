// import './App.css';
import Container from '@mui/material/Container';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import ResponsiveAppBar from './components/ResponsiveAppBar';

import EditorNote from './components/EditorNote';
import PreviousMagazine from './components/PreviousMagazine';
import CurrentMagazine from './components/CurrentMagazine';
import firestore from './api/firestore';
import { setMagazine } from './store/magazineSlice';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    firestore.getAllMagazines().then((result) => {
      dispatch(setMagazine(result));
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="xlg">
        <CurrentMagazine />
        <EditorNote />
        <Typography variant="h4" sx={{ marginTop: 10 }}>
          Previous Magazines
        </Typography>
        <PreviousMagazine onSelected={(magazineId) => navigate(`/magazines/${magazineId}`)} />
      </Container>

    </div>
  );
}

export default App;
