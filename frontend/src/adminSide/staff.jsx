import React, { useState } from 'react';
import Swal from 'sweetalert2';
import NavBar from './adminNavbar';
import Sidebar from './adminSidebar';
import { MdDelete } from 'react-icons/md';

function Status() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to add staff member');
      }

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: data.message || 'Staff member added successfully!',
      });
      setFullName('');
      setEmail('');
      setIsModalOpen(false); // Close modal after successful submission
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFullName('');
    setEmail('');
  };

  const handleDelete = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'The staff member has been removed.', 'success');
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className="card1">
        <Sidebar />
        <div className="card3">
          <div className="add">
            <h1 className="my">Manage Staff</h1>
            <button className="add-new" onClick={() => setIsModalOpen(true)}>
              + Add Staff
            </button>
          </div>

          <table className="staffTable">
            <thead>
              <tr className="tr1">
                <th className="td1">ID</th>
                <th className="td1">Name</th>
                <th className="td1">Email Address</th>
                <th className="td1">Status</th>
                <th className="td1">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr1">
                <td className="td1"></td>
                <td className="td1"></td>
                <td className="td1"></td>
                <td className="td1"></td>
                <td className="td1">
                  <div className="act">
                    <MdDelete className="del" onClick={handleDelete} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Staff</h2>
            <input
              type="text"
              className="inp1"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              className="inp1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="text" className="inp1" placeholder="Add as Staff" readOnly />
            <div className="modal-btn">
              <button className="con" onClick={handleSubmit}>
                Send Invites
              </button>
              <button className="con" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Status;
