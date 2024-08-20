import NavMenu from './components/navMenu.jsx';
import Footer from './components/footerMain.jsx';
import { Container } from 'react-bootstrap';
import './App.css'
import Cart from './components/cart.jsx';
import Card from './components/card.jsx';

const App = () => {
  const userId = 'user123';
  const products = [
    { id: 123, name: 'Продукт 1', price: 5, description: '' },
    { id: 2, name: 'Product 2', price: 5, description: 'Description 2' },
    // Добавьте другие продукты здесь
  ];

  return (
    <>
      <NavMenu></NavMenu>
      <Container style={{ minHeight: "350px" }}>
        <h1>Welcome to Noir-shop!</h1>
        <p>Select a menu option to get started.</p>
        <div className="d-flex">
          {products.map((product) => (
            <Card key={product.id} product={product} userId={userId} />
          ))}
        </div>
      </Container>
      <Cart userId={userId}/>
      <Footer></Footer>
    </>
  )
}

export default App
