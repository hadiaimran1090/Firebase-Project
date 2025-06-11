import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import toast from "react-hot-toast"

const ListingPage = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.handleCreateNewListing(name, isbnNumber, price);
      // Reset form after submission
      setName("");
      setIsbnNumber("");
      setPrice("");
      

      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;

