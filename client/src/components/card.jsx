import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../services/cartSlice';

const ProductCard = ({ product, userId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Передаем объект с ключами `telegramId` и `product`
    dispatch(addToCart({ telegramId: userId, product }));
  };

  return (
    <Card className="product-card" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;