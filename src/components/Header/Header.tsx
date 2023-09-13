import React, { useEffect, useState } from 'react';
import './Header.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { auth } from '../../firebase/config';
import { useUserAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import cogWheel from '../../assets/svg/cogwheel.svg'


const RedditHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const { user } = useUserAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  return () => unsubscribe();
}, []);  

const handleLogout = async () => {
  try {
    await auth.signOut();
    setIsLoggedIn(false);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const { 
  toggleCart,
  cartQuantity,
  getItemQuantity,
  
} = useCart()
const quantity = getItemQuantity(0)


const toggleUserInfo = () => {
  setIsUserInfoVisible(!isUserInfoVisible);
};

  return (
    <Navbar id="navbar" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Cinematography Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/products" as={NavLink}>Shop</Nav.Link>
          </Nav>

          {isLoggedIn ? (
              <div className='user-info' onClick={toggleUserInfo}>
                {user && user.displayName ? (
                  <div className="displayName">
                    {user.photoURL && (
                      <div>
                        <img className="userImg" src={user.photoURL} alt="User Profile" />
                      </div>
                    )}
                    {user.displayName}
                    <img className='cogwheel' src={cogWheel}></img>
                  </div>
                ) : null}
                {isUserInfoVisible && (
                  <div className="user-info-details">
                    <h3 className="title is-3">User Information</h3>
                    <p><strong>Name:</strong> {user?.displayName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <Button className="btn btn-danger mr-1" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="primary" className="login-Btn" href="/signIn">
                Login
              </Button>
            )}

            <Button className="cart-button"
            variant="success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div className='cart-counter'>
                {quantity}
              </div>
            </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RedditHeader;
