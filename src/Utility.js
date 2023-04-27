const deleteImageFromMagazine = (images, magazineId) => images.map((image) => ({
  ...image,
  magazine_id: image.magazine_id.filter((mg) => mg !== magazineId),
}));

export default {
  deleteImageFromMagazine,
};
