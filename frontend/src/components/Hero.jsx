import React from 'react';
import './Hero.css';
import { Link} from "react-router-dom";


const Hero = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
            <h1>Connect, Host and Celebrate: Your Events Our Platform!</h1>
            <p>Book and learn helpfull tips from  3,899+ mentors in world class companies from our global community.</p>
            <button className='btn-dark mr-8'><Link to="/events" >View Details</Link></button>
        </div>
    </div>
  )
}

export default Hero