import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import AdminPanel from "../adminSide/adminDashboard";
import StudentApp from "../adminSide/studentApp";
import AddStaff from "../adminSide/staff";
import Post from "../adminSide/postAnnoucement";
import Report from "../adminSide/reportGen";
import Panel from "../adminSide/adminPanel";
import AdminProfile from "../adminSide/adminProfile";
import AdminEditProfile from "../adminSide/editProfile";
import Notifications from "../adminSide/notification";
import Admin from '../adminSession/adminLogin';

// Mock authentication check (replace with actual logic)
const isAdminAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// ProtectedRoute component with SweetAlert
const AdminProtectedRoute = ({ element: Component, ...rest }) => {
  if (isAdminAuthenticated()) {
    return Component;
  } else {
    // Show SweetAlert notification
    Swal.fire({
      title: 'Access Denied!',
      text: 'Please log in first to access this page.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return <Navigate to="/adminLogin" replace />;
  }
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/adminLogin" element={<Admin />} />
      {/* Protected Admin Routes */}
      <Route path="/adminPanel" element={<AdminProtectedRoute element={<Panel />} />} />
      <Route path="/editProfile" element={<AdminProtectedRoute element={<AdminEditProfile />} />} />
      <Route path="/adminDashboard" element={<AdminProtectedRoute element={<AdminPanel />} />} />
      <Route path="/adminProfile" element={<AdminProtectedRoute element={<AdminProfile />} />} />
      <Route path="/studentApp" element={<AdminProtectedRoute element={<StudentApp />} />} />
      <Route path="/postAnnouncements" element={<AdminProtectedRoute element={<Post />} />} />
      <Route path="/reportGen" element={<AdminProtectedRoute element={<Report />} />} />
      <Route path="/addStaff" element={<AdminProtectedRoute element={<AddStaff />} />} />
      <Route path="/notification" element={<AdminProtectedRoute element={<Notifications />} />} />
    </Routes>
  );
};

export default AdminRoutes;
