// src/Components/Login/Login.jsx
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { auth } from '../../Firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Criar uma instância do useNavigate

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const trimmedEmail = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            console.log('Tentando fazer login com:', trimmedEmail); // Para debugar
            await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
            alert('Login realizado com sucesso!');
            navigate('/dashboard'); // Redirecionar para o Dashboard
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-form">
                <img src="src\assets\logo.png" alt="Stock&Cash" />
                <h1 className="login-header">STOCK&CASH</h1>
                <form onSubmit={handleEmailLogin}>
                    <div className="input-field">
                        <FaUser className="icon" />
                        <input 
                            type="email" 
                            placeholder="Usuário" 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-field">
                        <FaLock className="icon" />
                        <input 
                            type="password" 
                            placeholder="Senha" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button className='button-login'>Login</button>
                </form>
                </div>
                <div className="signup-link">
                    <p>Não tem uma conta? <a href="/register">Registre-se!</a></p>
                </div>
            </div>
            <div className="stock-Image">
                <img src="src\assets\proIMG.png" alt="Stock&Cash" />
            </div>
            
        </div>
    );
};

export default Login;
