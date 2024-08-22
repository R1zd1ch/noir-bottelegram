import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { clearSelectedProduct } from '../../services/productsSlice';
import ProductCarousel from './productCarousel'; // Import the new component

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(clearSelectedProduct());
  };

  return (
    <Container className="product-details my-5">
      <h2 className="text-center mb-4">{product.name}</h2>
      <ProductCarousel images={product.images} /> {/* Use the new component */}
      <div className="text-center">
        <p className="lead">{product.description}</p>
        <p className="h4">${product.price}</p>
      </div>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={handleBackClick}>
          Back to Products
        </Button>
      </div>
    </Container>
  );
};

export default ProductDetails;
