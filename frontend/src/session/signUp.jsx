import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing motion from framer-motion
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import logo from '../assets/1.png';
import { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import Swal from 'sweetalert2'; // Import SweetAlert
import './signUp.css';

function Logins() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    submit: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = {};
  
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(formData.password)) {
      isValid = false;
  
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password!',
        text: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
      });
    }
  
    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
  
      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch!',
        text: 'Password do not match!'
      });
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@student\.buksu\.edu\.ph$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email domain
    if (!validateEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Only @student.buksu.edu.ph emails are allowed.'
      });
      return;
    }

    if (validatePasswords()) {
      try {
        let response;
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };

        // Choose the endpoint based on the selected role
        if (formData.role === 'Staff' || formData.role === 'Admin') {
          response = await axios.post('http://localhost:3001/api/auth/register-admin', {
            ...userData,
            position: '', // Add empty position for admin/staff
            picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          });
        } else {
          response = await axios.post('http://localhost:3001/api/auth/register', userData);
        }

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.userId);

          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: response.data.message
          });

          switch (formData.role) {
            case 'Staff':
              Swal.fire('Please login to access your account');
              navigate('/staffLogin');
              break;
            case 'Admin':
              Swal.fire('Please login to access your account');
              navigate('/adminLogin');
              break;
            case 'Student':
              navigate('/login');
              break;
            default:
              navigate('/login');
          }
        }
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage
        });
      }
    }
  };

  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <>
      <motion.nav>
        <div className="logo">
          <motion.img
            src={logo}
            alt="logo"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <a href="/" className="home-link" style={{color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold'}}>Back</a>

      </motion.nav>
      <div className="bg">
        <motion.div
          className="card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='heading'>Create Account</h1>
          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input">
                <motion.input
                  className='in'
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <motion.input
                  className='in'
                  type="email"
                  name="email"
                  placeholder="Enter Institutional Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <div className="password-field">
                  <motion.input
                    className={`in ${errors.password ? 'error' : ''}`}
                    type={passwordVisibility.password ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <span onClick={() => togglePasswordVisibility('password')} className="eye-icon">
                    {passwordVisibility.password ? <PiEyeSlash /> : <PiEyeLight />}
                  </span>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="password-field">
                  <motion.input
                    className={`in ${errors.confirmPassword ? 'error' : ''}`}
                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re Enter Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span onClick={() => togglePasswordVisibility('confirmPassword')} className="eye-icon">
                    {passwordVisibility.confirmPassword ? <PiEyeSlash /> : <PiEyeLight />}
                  </span>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

              <div className="input-align">
                <motion.select
                  className='in'
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </motion.select>
              </div>
              <br />

              <button
                className='con'
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Account
              </button>
              <p className="sign">
                Already Have an Account?
                <a href="#" onClick={goToLogIn}> Sign In</a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Logins;