import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PreviousMagazine from '../../components/PreviousMagazine';
// import { loadMagazine } from '../../store/magazineSlice';
import CreateInfoDialog from '../../components/CreateInfoDialog';
import firestore from '../../api/firestore';
import { useMagazines } from '../../hooks/useMagazines';

function Magazines() {
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const magazines = useMagazines();
  const navigate = useNavigate();
  const handleMagazineSelect = (id) => {
    navigate(`/admin/adminMagazines/${id}`);
  };

  const handleCreateNewMagazine = async () => {
    setOpen(true);
  };
  const onInfo = async (name) => {
    const id = await firestore.createNewMagazine({ name, images: {} });
    setOpen(false);
    navigate(`/admin/adminMagazines/${id}`);
  };

  return loading ? <div>loading...</div> : (
    <Box sx={{ display: 'block' }}>
      <CreateInfoDialog
        open={open}
        setOpen={setOpen}
        onInfo={onInfo}
      />
      <AddPhotoAlternateIcon sx={{ width: 300, height: 300 }} onClick={handleCreateNewMagazine} />
      <PreviousMagazine resource={magazines} onSelected={handleMagazineSelect} />
    </Box>
  );
}

export default Magazines;
