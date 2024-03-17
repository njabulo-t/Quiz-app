import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useNavigate } from 'react-router-dom';
import './index.css';
import './Quiz.css'

export default function Homepage() {
const navigateTopic = useNavigate();

    const navigateToQuiz = () => {
        navigateTopic('/Quiz');
};
const navigateToQuizMusic = () => {
    navigateTopic('/QuizMusic');
};

const navigateToQuizHistory = () => {
    navigateTopic('/QuizHistory')
};

    return (
        <div>
        <Navbar  collapseOnSelect expand="lg" sticky="top" bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="#home">QuizZical</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0"/>
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/'>Home</Nav.Link>
            <NavDropdown title="Topics" id="collapsible-nav-dropdown">
            <NavDropdown.Item onClick={navigateToQuiz}>Art</NavDropdown.Item>
            <NavDropdown.Item onClick={navigateToQuizMusic}>Music</NavDropdown.Item>
            <NavDropdown.Item onClick={navigateToQuizHistory}>History</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>

      );
}
 