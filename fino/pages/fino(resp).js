import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Login from './api/login'; // Importar desde el archivo correcto
import Finanzas from './api/finances'; // Importar desde el archivo correcto

const Fino = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null); // Nuevo estado para almacenar el ID de usuario
  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);

  const handleLogin = (loggedInUsername, loggedInUserId) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
    setUserId(loggedInUserId); // Actualizar el ID de usuario
  };

  return (
    <div>
      <Head>
        <title>Seguimiento de gastos</title>
      </Head>
      {isLoggedIn ? (
        <div>
          <h1>Bienvenido {username}!</h1>
          <p>Presupuesto mensual: ${presupuesto}</p>
          <p>Presupuesto restante: ${restante}</p>
          <Finanzas userId={userId} /> {/* Pasar el ID de usuario al componente Finanzas */}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Fino;

