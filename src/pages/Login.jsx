import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast"

import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("logging in user...");

    try {
      const result = await firebase.singinUserWithEmailAndPass(email, password);
      console.log("Successfully logged in", result);
      toast.success("Login successful!");
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      console.error("Error logging in", err);
      toast.error("Login failed. Please check your credentials.");
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
          Login
        </Button>
      </Form>
      <h1 className="mt-5 mb-5">OR</h1>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        Signin with Google
      </Button>
    </div>
  );
};

export default LoginPage;








































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

// import { useFirebase } from "../context/Firebase";

// const LoginPage = () => {
//   const firebase = useFirebase();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (firebase.isLoggedIn) {
//       // navigate to home
//       navigate("/");
//     }
//   }, [firebase, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("login in a user...");
//     const result = await firebase.singinUserWithEmailAndPass(email, password);
//     console.log("Successfull", result);
//   };

//   return (
//     <div className="container mt-5">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter email"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Login
//         </Button>
//       </Form>
//       <h1 className="mt-5 mb-5">OR</h1>
//       <Button onClick={firebase.signinWithGoogle} variant="danger">
//         Signin with Google
//       </Button>
//     </div>
//   );
// };

// export default LoginPage;
