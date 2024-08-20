import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartItems, selectCartStatus, selectCartError } from '../services/cartSlice.js';
import { uniqueId } from 'lodash';

const Cart = ({ userId }) => {
  const dispatch = useDispatch();
  const cartStatus = useSelector(selectCartStatus);
  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId, cartStatus]);
  const cartItems = useSelector(selectCartItems);
  const cartError = useSelector(selectCartError);

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
                <li key={uniqueId()}>
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
