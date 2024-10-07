import React, { useState } from 'react';
import './styles/Register.css'; // Atualizado com o novo estilo

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <div className="name-fields">
          <input
            type="text"
            name="firstName"
            placeholder="Nome"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Sobrenome"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Nome de Usuário"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="acceptTerms">Aceito os termos de uso</label>
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
