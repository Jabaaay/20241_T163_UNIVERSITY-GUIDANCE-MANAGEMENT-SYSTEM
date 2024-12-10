import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Dashboard from '../dashboard';
import History from '../history';
import Status from '../status';
import Profile from '../profile';
import Edit_Profile from '../edit_profile';
import Login from '../session/login';
import Page from '../landingPage';
import Calendar from '../components/Calendar';
import SignUp from '../session/signUp';
import ForgotPass from '../session/forgotPassword';
import Staff from '../staffSide/staffLogin';

// Mock authentication check (replace with actual logic)
const isAuthenticated = () => {
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

    return <Navigate to="/login" replace />;
  }
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ForgotPass />} />
      <Route path="/staffLogin" element={<Staff />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/history" element={<ProtectedRoute element={<History />} />} />
      <Route path="/status" element={<ProtectedRoute element={<Status />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/edit_profile" element={<ProtectedRoute element={<Edit_Profile />} />} />
      <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
    </Routes>
  );
};

export default UserRoutes;
