import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../CSS/Header.css";

function Header() {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>ShopBridge</Navbar.Brand>
          </Link>
          <Nav className=" text-center me-auto">
            <Link to="/addItem">
              <Nav.Link href="/addItem">Add Item</Nav.Link>
            </Link>
            <Link to="/listItems">
              <Nav.Link href="/listItems">List All Items</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
