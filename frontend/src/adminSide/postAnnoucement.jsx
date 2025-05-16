import React, { useState, useEffect } from 'react';
import NavBar from './adminNavbar';
import Sidebar from './adminSidebar';
import Swal from 'sweetalert2';
import { MdDelete, MdEdit } from "react-icons/md";
import { format } from 'timeago.js';

function Status() {
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Separate modal for creating
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Separate modal for editing
    const [editingAnnouncement, setEditingAnnouncement] = useState(null); // Tracks which announcement is being edited
    const [version, setVersion] = useState(null);


    useEffect(() => {
        // Fetch existing announcements
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:3001/admin/announcements');
                if (response.ok) {
                    const data = await response.json();
                    setAnnouncements(data);
                } else {
                    console.error('Failed to fetch announcements');
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    // Clear form state
    const clearFormState = () => {
        setHeader('');
        setContent('');
        setFile(null);
        setEditingAnnouncement(null);
        setVersion(null);
    };

    const handlePost = async () => {
        // Validate header and content
        const trimmedHeader = header.trim();
        const trimmedContent = content.trim();

        if (!trimmedHeader) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Header',
                text: 'Please enter a valid header for the announcement.',
                confirmButtonColor: '#FFB703',
            });
            return;
        }

        if (!trimmedContent) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Content',
                text: 'Please enter valid content for the announcement.',
                confirmButtonColor: '#FFB703',
            });
            return;
        }

        const formData = new FormData();
        formData.append('header', trimmedHeader);
        formData.append('content', trimmedContent);
        if (file) formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3001/admin/announcements', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newAnnouncement = await response.json();
                setAnnouncements((prev) => [...prev, newAnnouncement]);
                clearFormState();
                setIsCreateModalOpen(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Announcement posted successfully!',
                    confirmButtonColor: '#FFB703',
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.message || 'Error posting announcement.',
                    confirmButtonColor: '#FFB703',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while posting the announcement.',
                confirmButtonColor: '#FFB703',
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the announcement!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3001/admin/announcements/${id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) throw new Error('Failed to delete announcement');
                    setAnnouncements((prevAnnouncements) =>
                        prevAnnouncements.filter((announcement) => announcement._id !== id)
                    );
                    Swal.fire('Deleted!', 'Announcement has been deleted.', 'success');
                } catch (error) {
                    console.error("Error deleting announcement:", error);
                    Swal.fire('Error!', 'Failed to delete the announcement.', 'error');
                }
            }
        });
    };

    const handleEdit = (announcement) => {
        console.log('Editing announcement:', announcement);
        setEditingAnnouncement(announcement);
        setHeader(announcement.header);
        setContent(announcement.content);
        setFile(null);
        setVersion(announcement.__v);
        setIsEditModalOpen(true);
    };
    
    
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('header', header);
        formData.append('content', content);
        if (file) formData.append('file', file);
        formData.append('__v', version);
    
        try {
            const response = await fetch(`http://localhost:3001/admin/announcements/${editingAnnouncement._id}`, {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                const updatedAnnouncement = await response.json();
                setAnnouncements((prevAnnouncements) =>
                    prevAnnouncements.map((announcement) =>
                        announcement._id === updatedAnnouncement._id ? updatedAnnouncement : announcement
                    )
                );
                clearFormState();
                setIsEditModalOpen(false);
                Swal.fire('Success', 'Announcement updated successfully!', 'success');
            } else if (response.status === 409) {
                Swal.fire('Error', 'Version conflict. Please reload and try again.', 'error');
            } else {
                Swal.fire('Error', 'Error updating announcement.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', 'An error occurred while updating the announcement.', 'error');
        }
    };
    
    const handleOpenCreateModal = () => {
        clearFormState();
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        clearFormState();
        setIsCreateModalOpen(false);
    };

    const handleCloseEditModal = () => {
        clearFormState();
        setIsEditModalOpen(false);
    };

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <div className="add">
                        <h1 className='my'>Announcement</h1>
                        <button className='add-new' onClick={handleOpenCreateModal}>+ New Announcement</button>
                    </div>
                    <table className='t-announcement'>
                        <thead>
                            <tr className='tr1'>
                                <th className='th1'>ID</th>
                                <th className='th1'>Image</th>
                                <th className='th1'>Header</th>
                                <th className='th1'>Content</th>
                                <th className='th1'>Date</th>
                                <th className='th1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length > 0 ? (
                                announcements.map((announcement, index) => (
                                    <tr key={announcement._id} className='tr1'>
                                        <td className='td1'>{index + 1}</td>
                                        <td className='td1'>
                                            {announcement.fileUrl ? (
                                                <img src={`http://localhost:3001/${announcement.fileUrl}`} alt="Announcement" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td className='td1'>{announcement.header}</td>
                                        <td className='td1'>{announcement.content}</td>
                                        <td className='td1'>{format(announcement.createdAt)}</td>
                                        <td className='td1'>
                                            <div className="act">
                                                <MdEdit className='edit' onClick={() => handleEdit(announcement)} />
                                                <MdDelete className='del' onClick={() => handleDelete(announcement._id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className='td1'>No Announcements</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Modal for creating announcement */}
                    {isCreateModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseCreateModal}>&times;</span>
                                <h2>Create Announcement</h2>
                                <input
                                    type="text"
                                    className='inp1'
                                    placeholder='Header'
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    required
                                />
                                <textarea
                                    rows={5}
                                    placeholder='Content'
                                    className='txtArea'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                <input
                                    type="file"
                                    className="inp1"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button
                                    className='con'
                                    onClick={handlePost}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal for editing announcement */}
                    {isEditModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseEditModal}>&times;</span>
                                <h2>Edit Announcement</h2>
                                <input
                                    type="text"
                                    className='inp1'
                                    placeholder='Header'
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    required
                                />
                                <textarea
                                    rows={5}
                                    placeholder='Content'
                                    className='txtArea'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                                <input
                                    type="file"
                                    className="inp1"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button
                                    className='con'
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Status;
