import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Notifications from "./components/Pages/Notifications";
import Register from "./components/Pages/Register";
import Profile from "./components/Pages/Profile";
import Navbar from "./components/Molecules/Navbar";
import CardPost from "./components/Molecules/CardPost";
import { AuthContext } from "./context/auth";

export default function Routers() {
  const { user } = AuthContext();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post">
          <Route path=":postId" element={<CardPost />} />
        </Route>
        <Route
          path="/profile"
          element={!user ? <Navigate replace to="/" /> : <Profile />}
        />
        <Route
          path="/notifications"
          element={!user ? <Navigate replace to="/" /> : <Notifications />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
}
