import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartItems, selectCartStatus, selectCartError, removeFromCart } from '../services/cartSlice';
import { Button } from 'react-bootstrap';
import Spinner from './spinner';

const Cart = ({ userId }) => {
  const dispatch = useDispatch();
  const cartStatus = useSelector(selectCartStatus);
  const cartItems = useSelector(selectCartItems);
  const cartError = useSelector(selectCartError);

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId, cartStatus]);


  const handleRemoveFromCart = (product) => {
    console.log(product)
    dispatch(removeFromCart({ telegramId: userId, productId: product.product_id }));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {/* {cartStatus === 'loading' && <p>Loading your cart...</p>} */}
      {cartStatus === 'loading' && <Spinner></Spinner>}
      {cartStatus === 'failed' && <p>Error: {cartError}</p>}
      {cartStatus === 'succeeded' && (
        <>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product_id}>
                  {item.name} - {item.quantity} x ${item.price}
                  <Button
                    variant="danger"
                    size="sm" 
                    styles={{ padding: '30px', outerWidth: "90px", fontSize: '10px' }} 
                    onClick={() => handleRemoveFromCart(item)}>
                    -
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
