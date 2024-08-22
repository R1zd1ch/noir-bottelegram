import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsStatus, selectProductsError, selectShowProducts, toggleShowProducts, toggleHideProducts, selectSelectedProduct, clearSelectedProduct } from './services/productsSlice.js';
import NavMenu from './components/navMenu.jsx';
import Footer from './components/footerMain.jsx';
import { Container } from 'react-bootstrap';
import './App.css';
import Cart from './components/cart.jsx';
import Card from './components/cardComponents/product.jsx';
import SimpleSpinner from './components/spinner.jsx';
import ProductDetails from './components/cardComponents/productDetails.jsx';
import { selectShowCart, toggleHideCart, toggleShowCart } from './services/cartSlice.js';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);
  const showProducts = useSelector(selectShowProducts);
  const selectedProduct = useSelector(selectSelectedProduct);
  const showCart = useSelector(selectShowCart);
  const userId = 'user456';
  const [loading, setLoading] = useState(true); // состояние для отображения спиннера

  useEffect(() => {
    if (productsStatus === 'idle' && showProducts) {
      dispatch(fetchProducts());
      console.log(products);
    }
  }, [dispatch, productsStatus, showProducts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // скрываем спиннер после загрузки
    }, 2000); // время в миллисекундах

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = () => {
    dispatch(toggleShowProducts()); // Меняем состояние showProducts
    dispatch(clearSelectedProduct());
    dispatch(toggleHideCart())
  };

  const handleCartClick = () => {
    dispatch(toggleShowCart());
    dispatch(toggleHideProducts());
    dispatch(clearSelectedProduct());
  }

  const handleClickOnBrandIcon = () => {
    dispatch(toggleHideProducts());
    dispatch(clearSelectedProduct());
    dispatch(toggleHideCart());
  };

  if (loading) {
    return (
      <>
        <div className="spinner-container">
          <SimpleSpinner />
          <p>Loading... Please wait</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavMenu 
      onMenuClick={handleMenuClick} 
      onBrandIconClick={handleClickOnBrandIcon} 
      onCartClick={handleCartClick}
      />
      <Container className="main-content" style={{ minHeight: '350px' }}>
        {selectedProduct ? (
            <ProductDetails product={selectedProduct} />
          ) : (
            <>
              <Container className="main-description-text">
                <h1>Welcome to Noir-shop!</h1>
                <p>Select a menu option to get started.</p>
              </Container>
              {showProducts && (
                <>
                  {productsStatus === 'loading' && (
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '350px' }}>
                      <SimpleSpinner />
                      <p>Loading products...</p>
                    </div>
                  )}
                  {productsStatus === 'failed' && <p>Error: {productsError}</p>}
                  {productsStatus === 'succeeded' && (
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                      {products.map((product, index) => (
                        <div key={product.product_id} className="fade-in-up m-2" style={{ animationDelay: `${index * 0.1}s` }}>
                          <Card product={product} userId={userId} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        {showCart && (
          <Cart userId={userId} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
