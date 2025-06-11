

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Container, Row, Col, Card } from "react-bootstrap"; // Importing Bootstrap components

const ViewOrderDetails = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, [params.bookId]); // Added dependency for the bookId to refresh orders on change

  return (
    <Container className="mt-3">
      <h1>Orders</h1>
      <Row className="mt-4">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => {
            const data = order.data();
            return (
              <Col key={order.id} xs={12} md={6} lg={4} className="mb-4">
                <Card className="border-primary">
                  <Card.Body>
                    <Card.Title>Order By: a person whose email is </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Email: {data.userEmail}
                    </Card.Subtitle>
                    <Card.Text>Qty: {data.qty}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default ViewOrderDetails;
/****************/
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useFirebase } from "../context/Firebase";
// const ViewOrderDetails = () => {
//   const params = useParams();
//   const firebase = useFirebase();

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
//   }, []);

//   return (
//     <div className="container mt-3">
//       <h1>Orders</h1>
//       {orders.map((order) => {
//         const data = order.data();
//         return (
//           <div
//             key={order.id}
//             className="mt-5"
//             style={{ border: "1px solid", padding: "10px" }}
//           >
//             <h5>Order By: {data.displayName}</h5>
//             <h6>Qty: {data.qty}</h6>
//             <p>Email: {data.userEmail}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ViewOrderDetails;
