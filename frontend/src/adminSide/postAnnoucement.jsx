import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './adminNavbar';
import Sidebar from './adminSidebar';
import { MdEdit, MdDelete } from "react-icons/md";

function Status() {
   

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <h1>Post Announcement</h1>
                    <div className="app">
                       <div className="addStaff">
                        <input type="text" className='inp1' placeholder='Header' required/>
                        <textarea name="" id="" className='txtArea' placeholder='Content'></textarea>
                        <input type="file" className='inp1' placeholder=''/><br /><br /><br /><br /><br />
                        <button className='con'>Post</button>
                       </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Status;
