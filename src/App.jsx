import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";
import AuthContext from "./components/AuthContext";
import HomePage from "./pages/HomePage";
import ShoppingItems from "./pages/ShoppingItems";
import ShoppingItem from "./pages/ShoppingItem";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <AuthContext>
      <Router>
        <NavLinks />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/shopping-items" element={<ShoppingItems />} />
          <Route path="/item/:name" element={<ShoppingItem />}/>
          <Route path="/:username/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
