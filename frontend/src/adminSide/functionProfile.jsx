import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileF() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false); // State to toggle edit mode
  const [course, setCourse] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('userInfo');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      setCourse(parsedUser.course || ''); // Set initial course
      setDepartment(parsedUser.department || ''); // Set initial department
    } else {
      // If no user data, navigate to the login page
      navigate('/login');
    }
  }, [navigate]);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleEdit = () => {
    setEditable(true); // Toggle to edit mode
  };

  const handleSave = () => {
    // Update the user data with the new course and department
    const updatedUserData = { ...userData, course, department };
    sessionStorage.setItem('userInfo', JSON.stringify(updatedUserData));
    setUserData(updatedUserData); // Update state with the new data
    setEditable(false); // Exit edit mode
  };

  return (
    <>
      <h1>Account Overview</h1>

      <div className="prof-card">
        <div className="prof-card1">
          <div className="prof">
            <button className='profile'>
              <img src={userData?.picture} alt="User Profile" />
            </button>
          </div>

          <div className="prof1">
          <button onClick={handleSave}>Account Overview</button>
          <button onClick={handleEdit}>Edit Account</button>

          </div>
        </div>

        <div className="prof-card2">
          <span className='profInfo'>Profile Information</span>

          <table className='t2'>
            <tr className='tr2'>
              <td className='td2'>Institutional Email</td>
              <td className='td2'><input type="text" className='inp' value={userData?.email} readOnly /></td>
            </tr>
            <tr className='tr2'>
              <td className='td2'>Full Name</td>
              <td className='td2'><input type="text" className='inp' value={userData?.name} readOnly /></td>
            </tr>
            <tr className='tr2'>
              <td className='td2'>Course</td>
              <td className='td2'>
                <input
                  type="text"
                  className='inp'
                  value={editable ? course : userData?.course}
                  onChange={(e) => setCourse(e.target.value)}
                  readOnly={!editable}
                />
              </td>
            </tr>
            <tr className='tr2'>
              <td className='td2'>Department</td>
              <td className='td2'>
                <input
                  type="text"
                  className='inp'
                  value={editable ? department : userData?.department}
                  onChange={(e) => setDepartment(e.target.value)}
                  readOnly={!editable}
                />
              </td>
            </tr>
            <tr className='tr2'>
              <td className='td2'>Role</td>
              <td className='td2'><input type="text" className='inp' value={userData?.role || 'Admin'} readOnly /></td>
            </tr>
            <tr>
              <td colSpan="2">
                {editable ? (
                  <button className='editBtn' onClick={handleSave}>Save Changes</button>
                ) : (
                  <button className='editBtn' onClick={handleEdit}>Edit Account</button>
                )}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProfileF;
