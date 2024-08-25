import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../services/cartSlice';
import { setSelectedProduct, toggleHideProducts } from '../../services/productsSlice';

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ telegramId: userId, product }));
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart({ telegramId: userId, productId: product.product_id }));
  };

  const handleViewDetails = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      dispatch(setSelectedProduct(product));
      dispatch(toggleHideProducts());
    }
  };

  // const buttonStyles = {
  //   width: '52px', 
  //   fontSize: "7px", 
  //   height: '40px',
  // };

  const buttonStyles = {
    width: '100px', 
    fontSize: "15px", 
    height: '70px',
  };

  return (
    <Card className="product-card" style={{ width: '18rem' }} onClick={handleViewDetails}>
      <Card.Img variant="top" src={product.images[0]} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <Container className="button-group-card">
          <Button style={buttonStyles} variant="primary" onClick={handleAddToCart} className="mr-2">
            Add to Cart
          </Button>
          <Button style={buttonStyles} variant="danger" onClick={handleRemoveFromCart}>
            Remove from Cart
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
