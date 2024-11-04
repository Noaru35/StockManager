// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/dashboard'; // Importar o componente Dashboard
import Fornecedores from './Components/Fornecedores/Fornecedores'; // Importar o componente Fornecedores


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* Rota para o Dashboard */}
                <Route path="/fornecedores" element={<Fornecedores />} /> {/* Rota para Fornecedores */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
