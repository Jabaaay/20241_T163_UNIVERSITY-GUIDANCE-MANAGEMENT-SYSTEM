import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Logins() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleSuccess = async (response) => {
    console.log("Login successful", response);

    try {
      const decoded = jwtDecode(response.credential);
      console.log(decoded);

      const res = await fetch('http://localhost:3001/admin/google-login', {
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
        setUserInfo(data.admin);
        sessionStorage.setItem('userInfo', JSON.stringify(data.admin));
        localStorage.setItem('token', data.token);
        navigate('/adminDashboard');
      } else {
        console.error('Error during login:', data.error);
        alert(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error("Failed to decode token or store user:", error);
      alert('Login failed. Please try again.');
    }
  };

  const handleFailure = (error) => {
    console.log("Login failed", error);
    alert('Google login failed. Please try again.');
  };

  return (
    <>
      <div id='signIn'>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </>
  );
}

export default Logins;
