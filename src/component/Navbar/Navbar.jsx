
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import logo from "../../../public/logo.png"

import { FaUser, FaSignInAlt, FaHome , FaLayerGroup } from "react-icons/fa";
import "./Navbar.css";

const Navbar1 = () => {
  return (
    <>
      <div className="navbar-body">
        {/* <Navbar className="navbar-main" expand="lg">
          <Container fluid>
          <Navbar.Brand className="navbar-title" as={Link} to="/">
 
            Project-1
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="navbar-text" as={Link} to="/">
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
            <Nav.Link className="navbar-text" as={Link} to="/">
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
      
            </Nav>
            <Nav className="navbar-right">
              <Button as={Link} to="/signup" className="mx-1 nav-btn" type="submit">
                <FaUser className="nav-icon" /> SignUp
              </Button>
              <Button as={Link} className="nav-btn" to="/login">
                <FaSignInAlt className="nav-icon" /> Login
              </Button>
            </Nav>
          </Navbar.Collapse>
          </Container>  
        </Navbar> */}
          <Navbar expand="lg" className="navbar-main bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img style={{width : "100px"}} src={logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Nav.Link className="navbar-text" as={Link} to="/">
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
              <Nav.Link className="navbar-text" as={Link} to="/product">
                <FaLayerGroup className="nav-icon" /> Products
              </Nav.Link>
        
           
          </Nav>
          <Button as={Link} to="/signup" className="mx-1 nav-btn" type="submit">
                <FaUser className="nav-icon" /> SignUp
              </Button>
              <Button as={Link} className="nav-btn" to="/login">
                <FaSignInAlt className="nav-icon" /> Login
              </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    </>
  );
};

export default Navbar1;
