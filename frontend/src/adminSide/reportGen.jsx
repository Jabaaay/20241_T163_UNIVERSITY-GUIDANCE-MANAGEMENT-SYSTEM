import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './adminNavbar.jsx';
//import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Sidebar from './adminSidebar.jsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();

      // Filter confirmed appointments
      const confirmedAppointments = data.filter(appointment => appointment.status === 'Confirmed');

      setAppointments(confirmedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const downloadPDF = async () => {
    const element = document.getElementById("appointment-table");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    pdf.save("appointments.pdf");
  };

  return (
    <>
      <NavBar />
      <div className="card1">
        <Sidebar />
        <div className="card3">
          <div className="his">
            <h1>Reports</h1>
            <select name="" id="" className="opt1">
              <option value="">Select College</option>
              <option value="">COT</option>
              <option value="">COB</option>
              <option value="">CPAG</option>
              <option value="">CON</option>
              <option value="">COE</option>
              <option value="">CAS</option>
            </select>
          </div>

          <button className='download-btn' onClick={downloadPDF}>Download PDF</button>

          <div className="app">
            <table id="appointment-table" className="t1">
              <thead>
                <tr className="tr1">
                  <th className="th1">ID</th>
                  <th className="th1">Appointment Type</th>
                  <th className="th1">Purpose</th>
                  <th className="th1">Date</th>
                  <th className="th1">Time</th>
                  <th className="th1">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map(appointment => (
                    <tr className="tr1" key={appointment._id}>
                      <td className="td1">{appointment._id}</td>
                      <td className="td1">{appointment.appType}</td>
                      <td className="td1">{appointment.purpose}</td>
                      <td className="td1">{appointment.date}</td>
                      <td className="td1">{appointment.time}</td>
                      <td className="td1">{appointment.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No Appointments</td>
                  </tr>
                )}
              </tbody>
             
            </table>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

