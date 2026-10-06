import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function AppNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand className="fw-bolder">
          PROJECT-HUB
        </Navbar.Brand>

        <div className="text-light">
          Welcome, Andrew
        </div>
      </Container>
    </Navbar>
    </div>
  )
}

export default AppNavbar
