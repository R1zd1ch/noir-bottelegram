import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.png'; // Импорт изображения

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  height: '100px',
};

const NavMenu = ({ onMenuClick }) => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img 
              src={logo}
              alt="NOIR"
              style={{ height: '60px', margin: '0', paddingLeft: '15px'}}
            />
          </Navbar.Brand>
          <Nav className="me-auto" style={navStyle}>
            <Nav.Link href="#catalog" onClick={onMenuClick}>Каталог</Nav.Link>
            <Nav.Link href="#cart">Корзина</Nav.Link>
            <Nav.Link href='#contacts'>Контакты</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavMenu;
