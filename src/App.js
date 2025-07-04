import { Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"


// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import { messaging } from "./context/Firebase";

function App() {

 return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
