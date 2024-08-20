import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartItems, selectCartStatus, selectCartError } from '../services/cartSlice.js';

const Cart = ({ userId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartStatus = useSelector(selectCartStatus);
  const cartError = useSelector(selectCartError);

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId, cartStatus, cartItems]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartStatus === 'loading' && <p>Loading your cart...</p>}
      {cartStatus === 'failed' && <p>Error: {cartError}</p>}
      {cartStatus === 'succeeded' && (
        <>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product_id}>
                  {item.name} - {item.quantity} x ${item.price}
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
