import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import "../MyNavbar.css"; // Import custom CSS for hover effects

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.signoutUser();
    toast.success("You have successfully logged out!");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
       
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
        </Nav>

        {/* Right Side Buttons with Borders and Hover Effect */}
        {firebase.isLoggedIn ? (
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="nav-btn"  // Applying the custom hover effect
          >
            Logout
          </Button>
        ) : (
          <div className="d-flex align-items-center gap-2">
            {/* d-flex and gap-2 class for spacing */}
            <Nav.Link href="/login" className="text-light nav-btn">
              Login
            </Nav.Link>
            <Nav.Link href="/register" className="text-light nav-btn">
              Register
            </Nav.Link>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

