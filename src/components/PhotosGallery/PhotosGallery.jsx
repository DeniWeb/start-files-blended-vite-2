import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

const PhotosGallery = ({ images, openModal }) => {
  console.log(images);

  return (
    <Grid>
      {images.map(({ id, avg_color, src, alt }) => (
        <GridItem key={id}>
          <PhotosGalleryItem
            avg_color={avg_color}
            src={src}
            alt={alt}
            openModal={openModal}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default PhotosGallery;
