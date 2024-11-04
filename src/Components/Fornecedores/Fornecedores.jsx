import React, { useState } from 'react';
import './fornecedores.css';
import { Link } from 'react-router-dom'; // Importe o Link no início do arquivo

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [formData, setFormData] = useState({
    nome_fornecedor: '',
    contato_fornecedor: '',
    telefone_fornecedor: '',
    email_fornecedor: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addFornecedor = () => {
    setFornecedores([...fornecedores, { id: Date.now(), ...formData }]);
    setFormData({ nome_fornecedor: '', contato_fornecedor: '', telefone_fornecedor: '', email_fornecedor: '' });
    setIsAdding(false);
  };

  const editFornecedor = (id) => {
    const fornecedorToEdit = fornecedores.find(f => f.id === id);
    setFormData(fornecedorToEdit);
    setSelectedFornecedor(id);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setFornecedores(fornecedores.map(f => (f.id === selectedFornecedor ? { ...f, ...formData } : f)));
    setIsEditing(false);
    setFormData({ nome_fornecedor: '', contato_fornecedor: '', telefone_fornecedor: '', email_fornecedor: '' });
  };

  const deleteFornecedores = () => {
    setFornecedores(fornecedores.filter(f => !selectedIds.includes(f.id)));
    setSelectedIds([]);
  };

  return (
    <div className="fornecedor-container">
            <div className="actions">
                <Link to="/dashboard"> {/* Link para voltar ao Dashboard */}
                    <button>Voltar ao Dashboard</button>
                </Link>
                <button onClick={() => setIsAdding(true)}>Adicionar Fornecedor</button>
                <button onClick={() => setIsEditing(true)}>Editar Fornecedor</button>
                <button onClick={() => setSelectedIds(fornecedores.map(f => f.id))}>Excluir Fornecedor</button>
            </div>
      <table>
        <thead>
          <tr>
            <th>Selecionar</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor.id}>
              <td>
                {isEditing && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(fornecedor.id)}
                    onChange={() => {
                      setSelectedIds(prev =>
                        prev.includes(fornecedor.id) ? prev.filter(id => id !== fornecedor.id) : [...prev, fornecedor.id]
                      );
                    }}
                  />
                )}
              </td>
              <td>{fornecedor.nome_fornecedor}</td>
              <td>{fornecedor.contato_fornecedor}</td>
              <td>{fornecedor.telefone_fornecedor}</td>
              <td>{fornecedor.email_fornecedor}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAdding && (
        <div className="modal">
          <h2>Adicionar Fornecedor</h2>
          <input name="nome_fornecedor" placeholder="Nome" value={formData.nome_fornecedor} onChange={handleInputChange} required />
          <input name="contato_fornecedor" placeholder="Contato" value={formData.contato_fornecedor} onChange={handleInputChange} />
          <input name="telefone_fornecedor" placeholder="Telefone" value={formData.telefone_fornecedor} onChange={handleInputChange} />
          <input name="email_fornecedor" placeholder="Email" value={formData.email_fornecedor} onChange={handleInputChange} />
          <button onClick={addFornecedor}>Concluir</button>
          <button onClick={() => setIsAdding(false)}>Cancelar</button>
        </div>
      )}

      {isEditing && (
        <div className="modal">
          <h2>Editar Fornecedor</h2>
          <input name="nome_fornecedor" placeholder="Nome" value={formData.nome_fornecedor} onChange={handleInputChange} required />
          <input name="contato_fornecedor" placeholder="Contato" value={formData.contato_fornecedor} onChange={handleInputChange} />
          <input name="telefone_fornecedor" placeholder="Telefone" value={formData.telefone_fornecedor} onChange={handleInputChange} />
          <input name="email_fornecedor" placeholder="Email" value={formData.email_fornecedor} onChange={handleInputChange} />
          <button onClick={saveEdit}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Descartar</button>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="confirm-delete">
          <p>Você tem certeza que deseja excluir {selectedIds.length} fornecedor(es)?</p>
          <button onClick={deleteFornecedores}>Confirmar</button>
          <button onClick={() => setSelectedIds([])}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Fornecedores;
