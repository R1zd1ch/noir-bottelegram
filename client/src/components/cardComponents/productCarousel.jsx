import React from 'react';
import { Carousel } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCarousel = ({ images }) => {
  const colors = ['#FF5733', '#33FF57', '#3357FF']; // Example colors

  return (
    <Carousel className="mb-4">
      {images && images.length > 0
        ? images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${index}`}
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))
        : [0, 1, 2].map((_, index) => (
            <Carousel.Item key={index}>
              <Skeleton
                width="100%"
                height={500}
                style={{
                  backgroundColor: colors[index % colors.length], // Apply static color
                  maxHeight: '500px',
                  objectFit: 'cover',
                  animation: 'none', // Disable the shimmer effect
                }}
              />
            </Carousel.Item>
          ))}
    </Carousel>
  );
};

export default ProductCarousel;
