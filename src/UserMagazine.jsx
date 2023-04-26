/* eslint-disable no-unused-vars */
// import './App.css';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import PreviousMagazine from './components/PreviousMagazine';
import CurrentMagazine from './components/CurrentMagazine';
import { useMagazines } from './hooks/useMagazines';
import Gallery from './Pages/UserPages/Gallery';

function UserMagazine() {
  const { magazines, deleteMagazine } = useMagazines();
  const [currentMagazine, setCurrentMagazine] = useState(null);

  const params = useParams();
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  React.useEffect(() => {
    const { id } = params;
    if (id) {
      const mag = magazines.find((mg) => mg.id === id);
      if (mag) {
        setCurrentMagazine(mag);
      }
    } else {
      setCurrentMagazine(magazines[0]);
    }
    goToTop();
  }, [magazines, params]);
  const navigate = useNavigate();
  return (
    <div>
      <Container maxWidth="xlg">
        {currentMagazine
        && <CurrentMagazine magazineList={magazines} currentMagazine={currentMagazine} />}
        {/* <EditorNote /> */}
        <Typography variant="h4" sx={{ marginTop: 10 }}>
          Previous Magazines
        </Typography>
        <PreviousMagazine
          withDelete={false}
          resource={magazines}
          onSelected={(magazineId) => navigate(`/magazines/${magazineId}`)}
        />
        <Gallery />
      </Container>

    </div>
  );
}

export default UserMagazine;
