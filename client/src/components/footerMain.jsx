import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5 text-center footer-no-margin">
      <Container className='fade-in-up-2'>
        <Row>
          <Col md={4}>
            <h5>Краткая информация о Noir</h5>
            <p>
              Украшения ручной работы: готовые и на заказ
              Комсомольск-на-Амуре
            </p>
          </Col>
          <Col md={4}>
            <h5>Полезные ссылки</h5>
            <Row>
              <Col>
                <Nav className="flex-column">
                  <Nav.Link href="#dostavka" className="text-white">
                    Доставка
                  </Nav.Link>
                  <Nav.Link href="#oplata" className="text-white">
                    Оплата
                  </Nav.Link>
                </Nav>
              </Col>
              <Col>
                <Nav className="flex-column">
                  <Nav.Link href="#contacts" className="text-white">
                    Контакты
                  </Nav.Link>
                  <Nav.Link href="#otziv" className="text-white">
                    Отзывы
                  </Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <h5>Подпишитесь на нас</h5>
            <Nav className="justify-content-center">
              <Nav.Link href="#tictok" className="text-white">
                <FontAwesomeIcon icon={faTiktok} /> TikTok
              </Nav.Link>
              <Nav.Link href="#telegram" className="text-white">
                <FontAwesomeIcon icon={faTelegram} /> TG
              </Nav.Link>
              <Nav.Link href="#VK" className="text-white">
                <FontAwesomeIcon icon={faVk} /> VK
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mt-4">
              &copy; 2024 Noir WebApp. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
