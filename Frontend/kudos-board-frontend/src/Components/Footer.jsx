import React from 'react';
import '../App.css';
import { FiInstagram } from "react-icons/fi";
import { CiFacebook } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";



const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <h3>About</h3>
                <p>
                    <span>Celebrating the power of appreciation.</span>
                    <span>Share gratitude, recognition, and kudos with your team.</span>
                    <span>Building stronger relationships and a positive work culture, one thank you at a time.</span>
                </p>
            </div>
            <div className='footer-container'>
                <h3 id="footer-contact">Contact Us</h3>
                <div className='icons-container'>
                    <span><FiInstagram className='icons'/> <span>@kudos</span> </span>
                    <span><CiFacebook className='icons'/> <span>@kudos</span> </span>
                    <span><MdOutlineMailOutline className='icons'/> <a href="mailto:info@kudos.com">info@kudos.com</a></span>
                    <span><FaPhone className='icons' /> <span>(555)-5678910</span></span>
                </div>
            </div>
            <p>Copyright &copy; 2024 Meta U</p>
        </footer>
    )
}

export default Footer;
