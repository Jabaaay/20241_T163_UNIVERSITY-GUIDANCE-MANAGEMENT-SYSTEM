import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './navbar'; // Import the NavBar component
import Sidebar from './sidebar';  // Import the Sidebar component

function Dashboard() {

    return (
        <>
            <NavBar />
            <div className="card1">
                <Sidebar />
                <div className="card3">
                    <h1>Book an Appointment</h1>
                    <div className="app">
                        <div className="type">
                            <h2>Select Appointment Type: </h2>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Individual</h4>
                            </div>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Group</h4>
                            </div>
                            <h2>Purpose: </h2>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Academic Counseling</h4>
                            </div>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Emotional Support</h4>
                            </div>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Career Guidance</h4>
                            </div>
                            <div className="input1">
                                <input className='check' type="checkbox" name="" id="" />
                                <h4>Behavioral Concerns</h4>
                            </div>
                        </div>

                       
                        <div className="purpose">
                            <h2>Select Date and Time</h2>
                            <iframe className='cal' 
                                src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_timezone">
                            
                            </iframe>

                            <div className='but'>

                            <div className="btns">
                                <button>8 - 9:00 am</button>
                                <button>9 - 10:00 am</button>
                                <button>10 - 11:00 am</button>
                            </div>
                            <div className="btns">
                                <button>1 - 2:00 pm</button>
                                <button>2 - 3:00 pm</button>
                                <button>3 - 4:00 pm</button>
                            </div>


                            </div>
                        </div>
                    </div>
                    <button className='btn'>Confirm</button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
