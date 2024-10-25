import React, { useState } from 'react';
import { FaPlus, FaHome, FaListUl, FaClipboard, FaCog } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleLogout = () => {
        window.location.href = "/login"; // Redireciona para a tela de login
    };

    return (
        <div className="dashboard-sidebar">
            <div className="dashboard-items">
                <ul className='dash-list'>
                    <li>
                        <a href="#">
                            <img src="src/assets/logo.png" alt="Logo" className='sidebar-logo' />
                        </a>
                    </li>
                    <li>
                        <button className='sidebar-button'>
                            <FaPlus />
                        </button>
                    </li>
                    <li>
                        <button className='sidebar-button'>
                            <FaHome />
                        </button>
                    </li>
                    <li>
                        <button className='sidebar-button'>
                            <FaListUl />
                        </button>
                    </li>
                    <li>
                        <button className='sidebar-button'>
                            <FaClipboard />
                        </button>
                    </li>
                </ul>
            </div>
            <div className="dashboard-footer">
                <button className='sidebar-button' onClick={togglePopup}>
                    <FaCog />
                </button>
                <div className={`popup ${isPopupVisible ? 'show' : 'hide'}`}>
                    <p onClick={handleLogout}>Sair da Conta</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
