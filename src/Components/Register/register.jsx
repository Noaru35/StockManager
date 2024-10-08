// src/Components/Register/Register.jsx
import React, { useState } from 'react';
import { auth, GoogleAuthProvider, FacebookAuthProvider } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [storeName, setStoreName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (email !== confirmEmail) {
            alert("Os emails não coincidem.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registro realizado com sucesso!");
            navigate('/login'); // Redireciona para a página de login após o registro
        } catch (error) {
            console.error('Erro ao realizar registro:', error);
            alert('Erro ao realizar registro: ' + error.message);
        }
    };

    const handleSocialRegister = async (providerType) => {
        try {
            let provider;
            if (providerType === 'Google') {
                provider = new GoogleAuthProvider();
            } else if (providerType === 'Facebook') {
                provider = new FacebookAuthProvider();
            } else if (providerType === 'Telefone') {
                const phoneNumber = prompt('Digite seu número de telefone (com DDD):');
                setupRecaptcha(); // Configura o reCAPTCHA
                const appVerifier = window.recaptchaVerifier;
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                const code = prompt('Digite o código de confirmação enviado para o seu telefone:');
                await confirmationResult.confirm(code);
                alert('Registro com telefone realizado com sucesso!');
                navigate('/login'); // Redireciona para a página de login após o registro
                return;
            }

            const result = await signInWithPopup(auth, provider);
            alert(`${providerType} registro realizado com sucesso!`);
            navigate('/login'); // Redireciona para a página de login após o registro
        } catch (error) {
            console.error('Erro ao realizar registro:', error);
            alert('Erro ao realizar registro: ' + error.message);
        }
    };

    // Configuração do reCAPTCHA
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // A reCAPTCHA foi resolvida
            },
            'expired-callback': () => {
                // A reCAPTCHA expirou
            }
        }, auth);
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                <h1>Registrar-se</h1>
                <div className="input-field">
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="text" 
                        placeholder="Sobrenome" 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="email" 
                        placeholder="Confirmar Email" 
                        onChange={(e) => setConfirmEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="text" 
                        placeholder="Nome da Loja" 
                        onChange={(e) => setStoreName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Confirmar Senha" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className='button-register'>Registrar</button>

                <div className="social-login">
                    <button type="button" onClick={() => handleSocialRegister('Google')}>
                        Registrar com Google
                    </button>
                    <button type="button" onClick={() => handleSocialRegister('Facebook')}>
                        Registrar com Facebook
                    </button>
                    <button type="button" onClick={() => handleSocialRegister('Telefone')}>
                        Registrar com Telefone
                    </button>
                </div>

                <div className="login-link">
                    <p>Já tem uma conta? <a href="/login">Faça login!</a></p>
                </div>
            </form>
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default Register;
