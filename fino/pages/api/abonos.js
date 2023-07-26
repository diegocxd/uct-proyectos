import React, { useState } from 'react';
import axios from 'axios';

const Abonos = ({ userId, onUpdatePresupuestoRestante }) => {
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

  const handleAbonoSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/abonos', { id_user: userId, monto, motivo })
      .then((response) => {
        if (response.data.success) {
          // Realizar alguna acción adicional si es necesario
          console.log('Abono registrado exitosamente');
          alert('Abono registrado exitosamente');
          onUpdatePresupuestoRestante(); // Actualizar el presupuesto restante
        } else {
          alert('Error al registrar Abono');
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error al registrar el abono:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleAbonoSubmit}>
        <button type="button" onClick={toggleDiv}>
          Registrar de Abono ⌵
        </button>
        <div className={`div-expandible ${expandido ? 'expandido' : ''}`}>
          <label>Monto:</label>
          <input className='letras-negro' type="number" value={monto} onChange={handleMontoChange} />
          <br></br>
          <label>Motivo:</label>
          <input className='letras-negro' type="text" value={motivo} onChange={handleMotivoChange} />
          <br></br>
          <button type="submit">Registrar Abono</button>
        </div>
      </form>
    </>
  );
};

export default Abonos;



