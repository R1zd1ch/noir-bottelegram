import NavMenu from './components/navMenu.jsx';
import Footer from './components/footerMain.jsx';
import { Container } from 'react-bootstrap';
import './App.css'

const App = () => {

  return (
    <>
      <NavMenu></NavMenu>
      <Container style={{ height: "100px" }}>
        <h1>Welcome to Noir-shop!</h1>
        <p>Select a menu option to get started.</p>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default App
