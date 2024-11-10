import { useNavigate } from 'react-router-dom';
import logo from './assets/book.png';
import logo1 from './assets/1.png';
import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const [announcements, setAnnouncements] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('http://localhost:3001/announcements');
      if (!response.ok) throw new Error('Failed to fetch announcements');
      const data = await response.json();
      setAnnouncements(data);  // Set the fetched data into state
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();  // Fetch announcements on component mount
  }, []);

  // Function to smoothly scroll to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleAnnouncements = showMore ? announcements : announcements.slice(0, 4);

  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo1} alt="logo" />
        </div>
        <ul className="order-list">
          <li onClick={() => scrollToSection('home-section')}>Home</li>
          <li onClick={() => scrollToSection('announcements-section')}>Announcements</li>
          <li onClick={() => scrollToSection('contact-section')}>Contact Us</li>
        </ul>
      </nav>

      <section id="home-section" className="section">
        <div className='landing-page'>
          <div className="content" id='home-section'>
            <h1 className="buksu"><b>BukSU Guidance</b></h1>
            <p className="cont">The BukSU Guidance Center assists the University in implementing quality programs and activities</p>
            <button className="login-button" onClick={handleLoginClick}>Log In</button>
          </div>
          <div className="logo1">
            <img src={logo} alt="logo1" />
          </div>
        </div>
      </section>

      <section id="announcements-section" className="section">
        <h1 className='ann'>Announcements</h1>
        <div className="an">
          {visibleAnnouncements.length > 0 ? (
            visibleAnnouncements.map((announcement) => (
              <div key={announcement._id} className="announcement-card">
                {announcement.fileUrl && 
                <img className='images' src={logo} alt="Announcement" />}
                <p className='heads'>{announcement.header}</p>
                <p className='conts'>{announcement.content}</p>
              </div>
            ))
          ) : (
            <p>No announcements available</p>
          )}
        </div>

        {announcements.length > 4 && !showMore && (
          <button className="see-more-button" onClick={() => setShowMore(true)}>See More</button>
        )}

        {showMore && announcements.length > 4 && (
          <button className="see-more-button" onClick={() => setShowMore(false)}>See Less</button>
        )}
      </section>

      <section id="contact-section" className="section">
        <h1 className='ann'>Contact Us</h1>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>Bukidnon State University<a href="">Fortich St., Malaybalay City, Bukidnon</a></p>
          <p>&copy; 2024 BukSU Guidance Center. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
