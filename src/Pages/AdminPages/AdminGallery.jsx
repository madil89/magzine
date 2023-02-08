import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PreviousMagazine from '../../components/PreviousMagazine';
import CreateInfoDialog from '../../components/CreateInfoDialog';
import firestore from '../../api/firestore';
import { loadGallery } from '../../store/gallerySlice';

function AdminGallery() {
  const [open, setOpen] = useState(false);
  const loading = useSelector((state) => state.loading);
  const gallery = useSelector((state) => state.gallery);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadGallery());
  }, []);
  const handleGallerySelect = (id) => {
    navigate(`/admin/adminMagazines/${id}`);
  };

  const handleCreateNewMagazine = async () => {
    setOpen(true);
  };
  const onInfo = async (name) => {
    const id = await firestore.createNewGallery({ name, images: [] });
    setOpen(false);
    navigate(`/admin/gallery/${id}`);
  };

  return loading ? <div>loading...</div> : (
    <Box sx={{ display: 'block' }}>
      <CreateInfoDialog
        open={open}
        setOpen={setOpen}
        onInfo={onInfo}
      />
      <AddPhotoAlternateIcon sx={{ width: 300, height: 300 }} onClick={handleCreateNewMagazine} />
      <PreviousMagazine resource={gallery} onSelected={handleGallerySelect} />
    </Box>
  );
}

export default AdminGallery;
