import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Cart from "./components/cart/Cart";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import OrderPage from "./components/orders/OrderPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import NewProduct from "./components/products/NewProduct";
import Profile from "./components/dashboard/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/new"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/edit"
          element={
            <ProtectedRoute>
              <NewProduct editing />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
