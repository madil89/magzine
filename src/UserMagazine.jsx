/* eslint-disable no-unused-vars */
// import './App.css';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import PreviousMagazine from './components/PreviousMagazine';
import CurrentMagazine from './components/CurrentMagazine';
import { useMagazines } from './hooks/useMagazines';

function UserMagazine() {
  const magazineList = useMagazines();
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
      const mag = magazineList.find((mg) => mg.id === id);
      if (mag) {
        setCurrentMagazine(mag);
      }
    } else {
      setCurrentMagazine(magazineList[0]);
    }
    goToTop();
  }, [magazineList, params]);
  const navigate = useNavigate();
  return (
    <div>
      <Container maxWidth="xlg">
        {currentMagazine
        && <CurrentMagazine magazineList={magazineList} currentMagazine={currentMagazine} />}
        {/* <EditorNote /> */}
        <Typography variant="h4" sx={{ marginTop: 10 }}>
          Previous Magazines
        </Typography>
        <PreviousMagazine
          resource={magazineList}
          onSelected={(magazineId) => navigate(`/magazines/${magazineId}`)}
        />
      </Container>

    </div>
  );
}

export default UserMagazine;
