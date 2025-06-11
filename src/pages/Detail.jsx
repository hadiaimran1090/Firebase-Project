
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"; // Import Modal
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [show, setShow] = useState(false); // State to show/hide Modal

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, [firebase, params.bookId]);

  useEffect(() => {
    if (data && data.imageURL) {
      firebase.getImageURL(data.imageURL).then((url) => setURL(url));
    }
  }, [data, firebase]);

  const placeOrder = async () => {
    try {
      await firebase.placeOrder(params.bookId, qty);
      console.log("Order Placed Successfully!");
      setShow(true); // Show success modal
    } catch (error) {
      console.error("Failed to place order", error);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      {url && (
        <img
          src={url}
          width="50%"
          style={{ borderRadius: "10px", marginBottom: "20px" }}
          alt="Book"
        />
      )}
      <h2>Details</h2>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>

      <h2>Owner Details</h2>
      <p>Email: {data.userEmail}</p>

      <Form.Group className="mb-3" controlId="formBasicQty">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Enter Quantity"
        />
      </Form.Group>

      <Button onClick={placeOrder} variant="success">
        Buy Now
      </Button>

      {/* Success Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>✅ Your order has been placed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetailPage;
