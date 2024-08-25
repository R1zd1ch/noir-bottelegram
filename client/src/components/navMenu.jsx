import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import { selectCartItems } from '../services/cartSlice';

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  height: '100px',
};

const NavMenu = ({ onMenuClick, onBrandIconClick, onCartClick }) => {
  const cartItems = useSelector(selectCartItems);
  const cartItemCount = cartItems.length;

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="fade-in-up-2">
          <Navbar.Brand onClick={onBrandIconClick} href="#home">
            <img 
              src={logo}
              alt="NOIR"
              style={{ height: '60px', margin: '0', paddingLeft: '15px'}}
            />
          </Navbar.Brand>
          <Nav className="me-auto" style={navStyle}>
            <Nav.Link href="#catalog" onClick={onMenuClick}>Каталог</Nav.Link>
            <Nav.Link href="#cart" onClick={onCartClick}>
              Корзина{' '}
              {cartItemCount > 0 && (
                <Badge bg="danger" pill>
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link href='#contacts'>Контакты</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavMenu;