import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../../../public/logo.png';
import { FaUser, FaSignInAlt, FaHome, FaLayerGroup, FaRegUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar1 = () => {
  const navigateTo = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }

    // Check if user is signed up
    const signedUpUser = localStorage.getItem('signUpUsers');
    if (signedUpUser) {
      setIsSignedUp(true);
    }
  }, []);

  const isAuthenticated = isLoggedIn  || isSignedUp;

  const handleLogout = () => {

   localStorage.removeItem('loggedInUser')
   localStorage.removeItem('signUpUsers')
    setIsLoggedIn(false);
    setIsSignedUp(false); 
    navigateTo('/'); 
  };
  
  return (
    <>
      <div className="navbar-body">
        <Navbar expand="lg" className="navbar-main bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img style={{ width: '100px' }} src={logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll={false}>
                <Nav.Link className="navbar-text" as={Link} to="/">
                  <FaHome className="nav-icon" /> Home
                </Nav.Link>
                <Nav.Link className="navbar-text" as={Link} to="/product">
                  <FaLayerGroup className="nav-icon" /> Products
                </Nav.Link>
                <Nav.Link className="navbar-text" as={Link} to="/profile">
                  <FaRegUser className="nav-icon" /> Profile
                </Nav.Link>
              </Nav>
              <div className="button-container">
                {isAuthenticated ? (
                  <Button onClick={handleLogout} className="nav-btn" type="button">
                    <FaSignInAlt className="nav-icon" /> Logout
                  </Button>
                ) : (
                  <>
                    <Button as={Link} to="/signup" className=" nav-btn" type="button">
                      <FaUser className="nav-icon" /> SignUp
                    </Button>
                    <Button as={Link} className="nav-btn" to="/login">
                      <FaSignInAlt className="nav-icon" /> Login
                    </Button>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Navbar1;
