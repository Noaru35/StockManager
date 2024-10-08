// src/Components/Login/Login.jsx
import { FaUser, FaLock, FaGoogle, FaFacebook, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import { auth, GoogleAuthProvider, FacebookAuthProvider } from '../../Firebase/firebase';
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    const handleSocialLogin = async (providerType) => {
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
                alert('Login com telefone realizado com sucesso!');
                return;
            }

            const result = await signInWithPopup(auth, provider);
            alert(`${providerType} login realizado com sucesso!`);
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login: ' + (error.code === 'auth/unauthorized-domain' ? 'Domínio não autorizado. Verifique as configurações do Firebase.' : error.message));
        }
    };

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
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleEmailLogin}>
                <h1>Acesse o Sistema</h1>
                <div className="input-field">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <FaLock className="icon" />
                </div>
                <button className='button-login'>Entrar</button>
                <div className="social-login">
                    <button type="button" onClick={() => handleSocialLogin('Google')}>
                        <FaGoogle /> Login com Google
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('Facebook')}>
                        <FaFacebook /> Login com Facebook
                    </button>
                    <button type="button" onClick={() => handleSocialLogin('Telefone')}>
                        <FaPhone /> Login com Telefone
                    </button>
                </div>
                <div id="recaptcha-container"></div>
                <div className="signup-link">
                    <p>Não tem uma conta? <a href="/register">Registre-se!</a></p>
                </div>

            </form>
        </div>
    );
};

export default Login;
