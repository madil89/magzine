// import './App.css';
import Container from '@mui/material/Container';
import React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar';

import EditorNote from './components/EditorNote';
import PreviousMagazine from './components/PreviousMagazine';
import CurrentMagazine from './components/CurrentMagazine';

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Container maxWidth="xlg">
        <CurrentMagazine />
        <EditorNote />
        <PreviousMagazine />
      </Container>

    </div>
  );
}

export default App;
