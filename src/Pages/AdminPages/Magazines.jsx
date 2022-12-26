import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PreviousMagazine from '../../components/PreviousMagazine';
import firestore from '../../api/firestore';
import AddNewMagazine from '../../components/AddNewMagazine';
import { setMagazine } from '../../store/magazineSlice';

function Magazines() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    firestore.getAllMagazines().then((result) => {
      dispatch(setMagazine(result));
    });
  }, []);
  const handleMagazineSelect = (id) => {
    navigate(`/admin/adminMagazines/${id}`);
  };

  const handleCreateNewMagazine = async () => {
    setOpen(true);
  };
  const handleMagazineCreated = (id) => {
    navigate(`/admin/adminMagazines/${id}`);
  };

  return (
    <Box sx={{ display: 'block' }}>
      <AddNewMagazine open={open} setOpen={setOpen} handleMagazineCreated={handleMagazineCreated} />
      <AddPhotoAlternateIcon sx={{ width: 300, height: 300 }} onClick={handleCreateNewMagazine} />
      <PreviousMagazine onSelected={handleMagazineSelect} />
    </Box>
  );
}

export default Magazines;
