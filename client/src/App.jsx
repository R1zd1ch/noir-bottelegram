import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError, selectShowProducts, toggleShowProducts } from './services/productsSlice.js';
import NavMenu from './components/navMenu.jsx';
import Footer from './components/footerMain.jsx';
import { Container } from 'react-bootstrap';
import './App.css';
import Cart from './components/cart.jsx';
import Card from './components/card.jsx';
import SimpleSpinner from './components/spinner.jsx';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);
  const showProducts = useSelector(selectShowProducts);
  const userId = 'user456';
  const [loading, setLoading] = useState(true); // состояние для отображения спиннера


  useEffect(() => {
    if (productsStatus === 'idle' && showProducts) {
      dispatch(fetchProducts());
      console.log(products);
    }
  }, [dispatch, productsStatus, showProducts]);

  useEffect(() => {
    // Симулируем задержку для демонстрации спиннера
    const timer = setTimeout(() => {
      setLoading(false); // скрываем спиннер после загрузки
    }, 2000); // время в миллисекундах

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = () => {
    dispatch(toggleShowProducts()); // Меняем состояние showProducts
  };

  if (loading) {
    return (
      <>
        <div className="spinner-container">
          <SimpleSpinner></SimpleSpinner>
          <p>Loading... Please wait</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavMenu onMenuClick={handleMenuClick}/>
      <Container style={{ minHeight: '350px' }}>
        <h1>Welcome to Noir-shop!</h1>
        <p>Select a menu option to get started.</p>
          {showProducts && (
            <>
              {productsStatus === 'loading' && 
                <SimpleSpinner 
                className="d-flex flex-column align-items-center justify-content-center" 
                style={{ minHeight: '350px' }}>
                </SimpleSpinner>
                }
              {productsStatus === 'loading' && <p>Loading products...</p>}
              {productsStatus === 'failed' && <p>Error: {productsError}</p>}
              {productsStatus === 'succeeded' && (
                <div className="d-flex product-grid">
                  {products.map((product) => (
                    <Card key={product.product_id} product={product} userId={userId} />
                  ))}
                </div>
              )}
            </>
          )}
      </Container>
      <Cart userId={userId} />
      <Footer />
    </>
  );
};

export default App;