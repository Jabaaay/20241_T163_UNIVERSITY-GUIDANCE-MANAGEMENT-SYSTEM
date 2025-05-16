import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importing motion from framer-motion
import logo from '../assets/1.png';
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

const RECAPTCHA_SITE_KEY = "6LdndnoqAAAAAFIKS5elH66llnZvKoOmPIY21CNv";

function Logins() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const loadGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    if (window.gapi) {
      loadGoogleAPI();
    } else {
      const script = document.createElement('script');
      script.src = "https://apis.google.com/js/api.js";
      script.onload = loadGoogleAPI;
      document.body.appendChild(script);
    }
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: 'AIzaSyA_viGY4c2LAW1tXrIxGI5KDohhibrH52E',
      clientId: "403785858213-teclugcpi5rmkocudnj0dqgk0h3j8f5n.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/calendar",
    }).then(() => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        authInstance.signIn();
      }
    });
  };

  const handleSuccess = async (response) => {
    try {
      sessionStorage.clear();
      const decoded = jwtDecode(response.credential);
      const res = await fetch('http://localhost:3001/staff/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          position: "",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setUserInfo(data.staff);
        sessionStorage.setItem('userInfo', JSON.stringify(data.staff));

        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Proceed to Profile for verification',
          confirmButtonText: 'OK',
          confirmButtonColor: '#FFB703',
        });

        navigate('/staff-Profile');
      } else {
        console.error('Error storing user:', data.error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.error || 'An error occurred during login',
          confirmButtonText: 'OK',
          confirmButtonColor: '#FFB703',
        });
      }
    } catch (error) {
      console.error("Failed to decode token or store user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred during login',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FFB703',
      });
    }
  };

  const handleFailure = (error) => {
    console.log("Login failed", error);
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Google login failed. Please try again.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#FFB703',
    });
  };

  const loginAdmin = () => {
    navigate('/login');
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  // Added navigation handlers
  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const goToSignUp = () => {
    navigate('/sign-up');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,  
      [e.target.name]: e.target.value
    });
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
  
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        sessionStorage.setItem('userInfo', JSON.stringify(data.admin)); // Store user info in session storage
  
        // Update state with the user data
        setUserInfo(data.admin);
  
        // Display SweetAlert2 toast notification
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
  
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
  
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/staff-profile'); // Adjust this path to match your routing
        }, 3000); // Wait for the toast to finish before redirecting
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
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
      <a href="/" className="home-link" style={{color: 'white', textDecoration: 'none', 
        fontSize: '1.2rem', fontWeight: 'bold'}}>Back</a>
    </motion.nav>
    <div className="bg">
      <motion.div
        className="card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading">Staff</h1>
        <form onSubmit={handleManualLogin}>
       
            <motion.input
            
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <motion.input
           
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <p className="pa" onClick={goToForgotPassword}>
              Forgot Password
            </p>
            
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleRecaptchaChange}
              className='recaptcha'
            />
            <motion.button
              type="submit"
              className='con'
            >
              Log In
            </motion.button>
          
            <div class="divider">
              <p className="or">or</p>
            </div>


          
            <motion.div
              id='signIn'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GoogleLogin 
                onSuccess={handleSuccess}
                onError={handleFailure}
              />
            </motion.div>

            <motion.button
              className="log-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#" onClick={loginAdmin}>Admin</a>
            </motion.button>
          
        </form>
      </motion.div>
    </div>


  </>
  );
}

export default Logins;
