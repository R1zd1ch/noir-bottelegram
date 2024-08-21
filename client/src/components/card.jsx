import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../services/cartSlice';

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ telegramId: userId, product }));
  };

  const handleRemoveFromCart = () => {
    console.log(product.id)
    dispatch(removeFromCart({ telegramId: userId, productId: product.product_id }));
  };

  return (
    <Card className="product-card" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary" onClick={handleAddToCart} className="mr-2">
          Add to Cart
        </Button>
        <Button variant="danger" onClick={handleRemoveFromCart}>
          Remove from Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
