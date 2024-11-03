import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import logo from './assets/1.png';
import buksulogo from './assets/buksu.jpg';
import Dashboard from './dashboard';  
import History from './history';  
import Status from './status';
import NavBar from './navbar'; // Import the NavBar component
import Profile from './profile';
import Edit_Profile from './edit_profile'
import {gapi} from 'gapi-script';
import Logins from "./session/login";
import AdminPanel from "./adminSide/adminDashboard"
import StudentApp from "./adminSide/studentApp"
import AddStaff from "./adminSide/addStaff"
import Post from "./adminSide/postAnnoucement"
import Report from "./adminSide/reportGen"
import Panel from "./adminSide/adminPanel"
import AdminProfile from "./adminSide/adminProfile"
import AdminEditProfile from "./adminSide/editProfile"




const clientId = "556695054744-arqaruhda60fv774uephm2irh0uan4du.apps.googleusercontent.com";



function Login() {


  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const handleLogin = () => {

    navigate('/dashboard');  
  };

  const loginAdmin = () => {
    navigate('/adminDashboard');
  }

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
      
          <label>Username:</label><input className='in' type="text" placeholder="Username" required />
          <label>Password:</label><input className='in' type="password" placeholder="Password" />
          <button className='log' onClick={handleLogin}>Log In</button> 
          
          <hr />
          
          <Logins className="log1" />

          <a className='ad' href="" onClick={loginAdmin}>Admin</a>

          
        </div>

       
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        
      <Route path="/adminPanel" element={<Panel />} /> 
      <Route path="/editProfile" element={<AdminEditProfile />} />
        <Route path="/adminDashboard" element={<AdminPanel />} /> 
        <Route path="/adminProfile" element={<AdminProfile />} /> 
        <Route path="/studentApp" element={<StudentApp />} /> 
        <Route path="/postAnnouncements" element={<Post /> } />
        <Route path="/reportGen" element={<Report /> } />
        <Route path="/addStaff" element={<AddStaff />} /> 
        <Route path="/" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/history" element={<History />} />  
        <Route path="/status" element={<Status />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/edit_profile" element={<Edit_Profile />} /> 

      </Routes>
    </Router>
  );
}

export default App;
