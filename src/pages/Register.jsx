
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

import { useFirebase } from "../context/Firebase";

const RegisterPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home if already logged in
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up a user...");

    try {
      const result = await firebase.signupUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Successfully signed up", result);
      toast.success("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Error during registration", err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
