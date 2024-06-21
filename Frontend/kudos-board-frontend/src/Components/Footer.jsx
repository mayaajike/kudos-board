import React from 'react';
import '../App.css';
import { FiInstagram } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";



const Footer = () => {
    return (
        <footer>
            <div className='footer-about'>
                <p>
                    <h3>About</h3>
                    <span>Celebrating the power of appreciation.</span>
                    <span>Share gratitude, recognition, and kudos with your team.</span>
                    <span>Building stronger relationships and a positive work culture, one thank you at a time.</span>
                </p>
            </div>
            <div>
                <h3>Contact</h3>
                <div className='icons-container'>
                    <FiInstagram className='icons'/> @kudos
                    <CiFacebook className='icons'/> @kudos
                    <MdOutlineMailOutline className='icons'/> <a href="mailto:info@kudos.com">info@kudos.com</a>
                    <FaPhone className='icons' /> +1-(234)-5678910
                </div>
            </div>
            <p>Copyright &copy; 2024 Meta U</p>
        </footer>
    )
}

export default Footer;
