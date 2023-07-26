import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => { // Recibe onLogin como prop desde "fino"
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:3001/api/login', { username, password })
      .then((response) => {
        if (response && response.data && response.data.success) {
          setMessage(response.data.message);
          onLogin(username, response.data.id_user); // Pasa el id_user a la función onLogin
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setMessage(error.response.data.message);
        } else {
          setMessage('Error en la solicitud');
        }
      });
  };

  return (
    <div className="center-content">
      <form onSubmit={handleLogin}>
        <h1 className="h1-login">Login</h1>
        <label>
          Nombre de usuario:
          <div></div>
          <input className='letras-negro' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <div></div>
        <label>
          Contraseña:
          <div></div>
          <input className='letras-negro' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div></div>
        <button type="submit">Ingresar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;



