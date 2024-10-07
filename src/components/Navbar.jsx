import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Assumindo que você tenha um arquivo de estilo

function Navbar() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">StockMCash</Link>
      </div>
      <div className="navbar-right">
        <div className="login-container">
          <button onClick={toggleLoginDropdown} className="login-button">
            Iniciar sessão
          </button>
          {showLoginDropdown && (
            <div>
              <form className="login-dropdown">
                <input type="text" placeholder="Usuário" />
                <input type="password" placeholder="Senha" />
                <button type="submit">Login</button>
              </form>
            </div>
          )}
        </div>
        <Link to="/register" className="register-button">
          Registrar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
