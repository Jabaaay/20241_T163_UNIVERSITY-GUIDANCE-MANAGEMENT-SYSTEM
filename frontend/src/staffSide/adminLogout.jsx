import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Swal from "sweetalert2";

function Logout() {
  const navigate = useNavigate();

  const onSuccess = async () => {
    try {
      // Clear Google login
      googleLogout();

      // Remove all local and session storage data
      sessionStorage.clear();
      localStorage.clear();

      // Notify user and navigate to login page
      await Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have successfully logged out!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FFB703',
        customClass: {
          confirmButton: 'swal-btn',
        },
      });

      navigate("/"); // Navigate back to login or landing page
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'There was an error logging out. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FFB703',
      });
    }
  };

  return (
    <div id='signOut'>
      <button className="logout" onClick={onSuccess}>Log Out</button>
    </div>
  );
}

export default Logout;
