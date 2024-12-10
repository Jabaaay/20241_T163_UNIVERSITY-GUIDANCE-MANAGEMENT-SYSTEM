import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar'; // Import the NavBar component
import Sidebar from './sidebar';
import React, { useEffect, useState } from 'react';

function History() {
  const [appointments, setAppointments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3001/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();

      // Filter confirmed appointments
      const confirmedAppointments = data.filter(
        (appointment) => appointment.status === 'Confirmed'
      );

      setAppointments(confirmedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filter appointments by the selected month
  const filteredAppointments = selectedMonth
    ? appointments.filter((appointment) => {
        const appointmentMonth = new Date(appointment.date).getMonth() + 1; // Months are 0-based
        return parseInt(selectedMonth, 10) === appointmentMonth;
      })
    : appointments;

  return (
    <>
      <NavBar />
      <div className="card1">
        <Sidebar />
        <div className="card3">
          <div className="his">
            <h1>History</h1>
            <select
              name="month"
              id="month"
              className="opt1"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <div className="app">
            <table className="t1">
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
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
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
                    <td colSpan="7" className="text-center">
                      No Appointments
                    </td>
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

export default History;
