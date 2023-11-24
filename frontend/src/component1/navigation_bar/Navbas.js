import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";
import "./Navbar.css";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary nav" >
      <Container fluid>
        <Navbar.Brand href="#" className="brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-infinity " viewBox="0 0 16 16">
                  <path d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z"/>
          </svg>
          Infinity Link</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to="../home/Home.js">Home</Nav.Link>
            <Nav.Link to="../userprofile/user.js">User Profile</Nav.Link>
            <Nav.Link to="../post/Post.js">Add Post</Nav.Link>
           
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search User"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-danger">Log_Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;