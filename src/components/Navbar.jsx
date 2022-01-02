import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="Logo" width="50px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className="text-light">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/products" className="text-light">
                  Products
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/companies" className="text-light">
                  Companies
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/quotations" className="text-light">
                  Quotations
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
