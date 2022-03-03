import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/playerActions.js";

const Header = () => {
  const playerLogin = useSelector((state) => state.playerLogin);
  const { playerInfo } = playerLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src='/images/logo-nav.png' fluid></Image>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/players'>
                <Nav.Link>Players</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/fixtures'>
                <Nav.Link>Fixtures & Results</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/league'>
                <Nav.Link>Leagues</Nav.Link>
              </LinkContainer>
              {playerInfo && playerInfo.isAdmin && (
                <LinkContainer to='/admin'>
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              )}
              {playerInfo ? (
                <NavDropdown
                  title={playerInfo.firstName}
                  id='username'
                  variant='primary'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
