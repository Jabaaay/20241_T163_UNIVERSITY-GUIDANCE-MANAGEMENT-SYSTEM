import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import logo from '../assets/1.png';
import ReCAPTCHA from "react-google-recaptcha";

const clientId = "556695054744-arqaruhda60fv774uephm2irh0uan4du.apps.googleusercontent.com";
const RECAPTCHA_SITE_KEY = "6LdndnoqAAAAAFIKS5elH66llnZvKoOmPIY21CNv"; 

function Logins() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // State to hold user information
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  // Inside handleSuccess in Logins component
  const handleSuccess = async (response) => {
    console.log("Login successful", response);

    try {
      // Clear previous session data before logging in a new user
      sessionStorage.clear(); 

      const decoded = jwtDecode(response.credential); // Decode the JWT token
      console.log(decoded); // Log decoded info for debugging

      // Send data to the backend for storage
      const res = await fetch('http://localhost:3001/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleId: decoded.sub, // Unique Google ID
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          course: "", // Empty course to be filled later
          department: "", // Empty department to be filled later
        }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('User stored successfully:', data);
        setUserInfo(data.user);
        sessionStorage.setItem('userInfo', JSON.stringify(data.user)); // Store user info in sessionStorage

        // Navigate to profile completion page
        navigate('/profile');
      } else {
        console.error('Error storing user:', data.error);
      }
    } catch (error) {
      console.error("Failed to decode token or store user:", error);
    }
  };

  const handleFailure = (error) => {
    console.log("Login failed", error);
  };

  const handleLogin = () => {
    if (recaptchaValue) {
      // Clear session data before proceeding with login
      sessionStorage.clear();

      // Continue login if reCAPTCHA is solved
      navigate('/dashboard');  
    } else {
      alert("Please complete the reCAPTCHA verification.");
    }
  };

  const loginAdmin = () => {
    // Clear session data before navigating to admin login
    sessionStorage.clear();  
    navigate('/adminLogin');  
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </nav>
      <div className="card">
        <h1 className='h1'>Log In</h1>
        <div className="input">
          <label>Username:</label>
          <input className='in' type="text" placeholder="Username" required />
          <label>Password:</label>
          <input className='in' type="password" placeholder="Password" />
          
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange} className='recaptcha'
          />
          <button className='log' onClick={handleLogin}>Log In</button>

          <hr />

          <div id='signIn'>
            <GoogleLogin 
              clientId={clientId}
              buttonText="Login"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy={'single-host-origin'}
              isSignedIn={true}
            />
          </div>

          <button className="log-btn"><a className='' href="" onClick={loginAdmin}>Admin</a></button>
        </div>
      </div>
    </>
  );
}

export default Logins;
