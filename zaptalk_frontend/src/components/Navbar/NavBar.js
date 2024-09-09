import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
      <Link to="/home" className="nav-link">Logo</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/profile" className="nav-link">Profiles</Link>
            <Link to="/feed" className="nav-link">Feed</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;