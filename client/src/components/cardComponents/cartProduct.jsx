import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFromCart, toggleHideCart } from '../../services/cartSlice';
import { setSelectedProduct } from '../../services/productsSlice';

const CartProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart({ telegramId: userId, productId: product.product_id }));
  };

  const handleViewDetails = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      dispatch(setSelectedProduct(product));
      dispatch(toggleHideCart());
    }
  };

  return (
    <Card className="product-card mb-3" style={{ width: '100%', maxHeight: '217px' }} onClick={handleViewDetails}>
      <Card.Body className="text-center d-flex flex-column align-items-center">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <div className="d-flex justify-content-center">
          <Button
            variant="danger"
            className="rounded-circle"
            style={{ width: '40px', height: '40px' }}
            onClick={handleRemoveFromCart}
          >
            -
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartProductCard;
