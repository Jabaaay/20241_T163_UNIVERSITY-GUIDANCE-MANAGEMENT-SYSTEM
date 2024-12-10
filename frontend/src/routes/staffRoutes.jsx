import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import AdminPanel from "../staffSide/adminDashboard";
import StudentApp from "../staffSide/studentApp";
import Post from "../staffSide/postAnnoucement";
import Report from "../staffSide/reportGen";
import Panel from "../staffSide/adminPanel";
import AdminProfile from "../staffSide/adminProfile";
import AdminEditProfile from "../staffSide/editProfile";
import Notifications from "../staffSide/notification";

// Mock authentication check (replace with actual logic)
const isAuthenticated = () => {
  // Example: Check if a token exists in localStorage or context
  return localStorage.getItem('token') !== null;
};

// ProtectedRoute component with SweetAlert
const ProtectedRoute = ({ element: Component, ...rest }) => {
  if (isAuthenticated()) {
    return Component;
  } else {
    // Show SweetAlert notification
    Swal.fire({
      title: 'Access Denied!',
      text: 'Please log in first to access this page.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });

    return <Navigate to="/staffLogin" replace />;
  }
};

const StaffRoutes = () => {
  return (
    <Routes>
      <Route
        path="/adminPanel"
        element={<ProtectedRoute element={<Panel />} />}
      />
      <Route
        path="/editProfile"
        element={<ProtectedRoute element={<AdminEditProfile />} />}
      />
      <Route
        path="/staff-Dashboard"
        element={<ProtectedRoute element={<AdminPanel />} />}
      />
      <Route
        path="/staff-Profile"
        element={<ProtectedRoute element={<AdminProfile />} />}
      />
      <Route
        path="/staff-studentApp"
        element={<ProtectedRoute element={<StudentApp />} />}
      />
      <Route
        path="/staff-postAnnouncements"
        element={<ProtectedRoute element={<Post />} />}
      />
      <Route
        path="/staff-reportGen"
        element={<ProtectedRoute element={<Report />} />}
      />
      <Route
        path="/staff-notification"
        element={<ProtectedRoute element={<Notifications />} />}
      />
    </Routes>
  );
};

export default StaffRoutes;
