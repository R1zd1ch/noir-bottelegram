import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartItems, selectCartStatus, selectCartError } from '../services/cartSlice';
import Spinner from './spinner';
import CartProductCard from './cardComponents/cartProduct';
import '../styles/cart.css'; // Импортируем CSS для кастомного стиля

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

  return (
    <div>
      <h2>Your Cart</h2>
      {cartStatus === 'loading' && <Spinner />}
      {cartStatus === 'failed' && <p>Error: {cartError}</p>}
      {cartStatus === 'succeeded' && (
        <>
          {cartItems.length > 0 ? (
            <div className="cart-container d-flex flex-wrap justify-content-center">
              {cartItems.map((item) => (
                <div key={item.product_id} className="cart-item">
                  <CartProductCard product={item} userId={userId} />
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
