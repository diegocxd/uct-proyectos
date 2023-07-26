import React, { useState } from 'react';
import Head from 'next/head';
import Login from './api/login';
import Presupuesto from './api/presupuesto';
import Frases from './api/frases';


const Fino = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLogin = (loggedInUsername, loggedInUserId) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
    setUserId(loggedInUserId);
  };

  return (
    <div className='imagen-fondo'>
      <div >
        <Head>
          <title>Seguimiento de gastos</title>
        </Head>
        {isLoggedIn ? (
          <div>
            <h1 className='centrar-fino'>FINO</h1>
            <h1 className='derecha-bienvenido'>Bienvenido {username}!</h1>
            <Presupuesto userId={userId} />
            <Frases/>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default Fino;





