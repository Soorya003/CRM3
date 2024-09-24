// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPost from "./components/ProductPost";
import ViewComplaints from "./components/ViewComplaints";
import UpdateComplaintStatus from "./components/UpdateComplaintStatus";
import ViewFeedback from "./components/ViewFeedback";
import BuyProduct from "./components/BuyProduct";
import PostComplaint from "./components/PostComplaint";
import SeeComplaintStatus from "./components/SeeComplaintStatus";
import GiveFeedback from "./components/GiveFeedback";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import { useSelector } from 'react-redux';

function App() {
  const userRole = useSelector((state) => state.auth.userRole);
  console.log('User Role:', userRole); // Debugging log
  return (
    <Router>
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        {userRole === "admin" ? (
          <Route path="/dashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/dashboard" element={<UserDashboard />} />
        )}
        <Route
          path="/product-post"
          element={
            <ProtectedRoute>
              <ProductPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-complaints"
          element={
            <ProtectedRoute>
              <ViewComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-complaint-status"
          element={
            <ProtectedRoute>
              <UpdateComplaintStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-feedback"
          element={
            <ProtectedRoute>
              <ViewFeedback />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/buy-product"
          element={
            <ProtectedRoute>
              <BuyProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-complaint"
          element={
            <ProtectedRoute>
              <PostComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/see-complaint-status"
          element={
            <ProtectedRoute>
              <SeeComplaintStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/give-feedback"
          element={
            <ProtectedRoute>
              <GiveFeedback />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
