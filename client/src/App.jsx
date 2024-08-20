import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError } from './services/productsSlice.js';
import NavMenu from './components/navMenu.jsx';
import Footer from './components/footerMain.jsx';
import { Container } from 'react-bootstrap';
import './App.css';
import Cart from './components/cart.jsx';
import Card from './components/card.jsx';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);
  const userId = 'user123';

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  return (
    <>
      <NavMenu />
      <Container style={{ minHeight: '350px' }}>
        <h1>Welcome to Noir-shop!</h1>
        <p>Select a menu option to get started.</p>
        {productsStatus === 'loading' && <p>Loading products...</p>}
        {productsStatus === 'failed' && <p>Error: {productsError}</p>}
        {productsStatus === 'succeeded' && (
          <div className="d-flex product-grid">
            {products.map((product) => (
              <Card key={product.id} product={product} userId={userId} />
            ))}
          </div>
        )}
      </Container>
      <Cart userId={userId} />
      <Footer />
    </>
  );
};

export default App;