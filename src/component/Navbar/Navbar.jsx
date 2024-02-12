import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Navbar.css";

const Navbar1 = () => {
  return (
    <>
    <div className="navbar-body">

      <Navbar className="navbar-main" expand="lg">
        <Navbar.Brand className="navbar-title" as={Link} to="/">
          Project-1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-body mr-auto">
            <Nav.Link className="navbar-text" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="navbar-text" as={Link} to="/product">
              Products
            </Nav.Link>
            {/* Add more Nav.Link components for additional menu items */}
          </Nav>
          <div className="btn-group">
            <Button as={Link} to="/signup" className="mx-1 nav-btn" type="submit">
              SignUp
            </Button>
            <Button as={Link} className="nav-btn" to="/login">
              Login
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
    </>
  );
};

export default Navbar1;
