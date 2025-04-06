import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Text from '../components/Text/Text';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import ImageModal from '../components/ImageModal/ImageModal';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };

  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {!error && !isEmpty && !images.length && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">Щось пішло не так!</Text>}
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isEmpty && <Text textAlign="center">Напиши щось нормальне!</Text>}
      {images.length > 0 && !isLoading && isVisible && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;
