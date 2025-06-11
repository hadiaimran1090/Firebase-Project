import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";
import Image from "react-bootstrap/Image";


const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container mt-5">

      {/* Welcome Text */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Welcome to BookVerse 📚</h1>
        <p className="lead mt-3">
          Dive into a world full of imagination, inspiration, and knowledge.  
          Find your next favorite book today!
        </p>
      </div>

      {/* Beautiful Banner Image */}
      <div className="d-flex justify-content-center mb-5">
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1050&q=80"
          style={{ width: "600px", height: "auto", borderRadius: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          alt="Books Banner"
          fluid
        />
      </div>

      {/* Section Heading */}
      <h2 className="text-center mb-4">Our Latest Collection 📖</h2>

      {/* Book Cards */}
      <CardGroup>
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
          />
        ))}
      </CardGroup>
      
    </div>
  );
};

export default HomePage;

