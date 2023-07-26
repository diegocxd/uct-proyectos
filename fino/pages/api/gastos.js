import React, { useState } from 'react';
import axios from 'axios';

const Gastos = ({ userId, onUpdatePresupuestoRestante }) => {
  const [monto, setMonto] = useState('');
  const [motivo, setMotivo] = useState('');
  const [expandido, setExpandido] = useState(false);

  const toggleDiv = () => {
    setExpandido(!expandido);
  };

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleMotivoChange = (e) => {
    setMotivo(e.target.value);
  };

  const handleGastoSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/gastos', { id_user: userId, monto, motivo })
      .then((response) => {
        if (response.data.success) {
          // Realizar alguna acción adicional si es necesario
          console.log('Gasto registrado exitosamente');
          alert('Gasto registrado exitosamente');
          onUpdatePresupuestoRestante(); // Actualizar el presupuesto restante
        } else {
          alert('El gasto no se a podido registrar');
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error al registrar el gasto:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleGastoSubmit}>
        <button type="button" onClick={toggleDiv}>
          Registrar de Gasto ⌵
        </button>
        <div className={`div-expandible ${expandido ? 'expandido' : ''}`}>
          <label>Monto:</label>
          <input className='letras-negro' type="number" value={monto} onChange={handleMontoChange} />
          <br></br>
          <label>Motivo:</label>
          <input className='letras-negro' type="text" value={motivo} onChange={handleMotivoChange} />
          <br></br>
          <button type="submit">Registrar Gasto</button>
        </div>
      </form>
    </>
  );
};

export default Gastos;



