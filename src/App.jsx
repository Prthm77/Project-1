import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar1 from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import ProductListing from "./component/Product/ProductListing";
import ViewProduct from "./component/Product/ViewProduct";
import Profile from "./component/Profile/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLoggedIn(true);
    }

    const users = JSON.parse(localStorage.getItem("signUpUsers"));
    if (users && users.length > 0) {
      setIsSignedUp(true);
    }
  }, []);

  const isAuthenticated = isLoggedIn && isSignedUp;

  return (
    <>
      <Router>
        <Navbar1 />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<SignUp setIsSignedUp={setIsSignedUp} />}
          />
          <Route path="/product" element={<ProductListing />} />
          <Route path="/view/:id" element={<ViewProduct />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
