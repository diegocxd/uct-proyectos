import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
//exporto los otros componentes
import PresupuestoCircular from '../graficos/circular';
import Gastos from './gastos';
import Abonos from './abonos';
import TablaFinanzas from './tabla-finanzas';

const Presupuesto = ({ userId }) => {
  //defino los estados
  const [presupuesto, setPresupuesto] = useState(0);
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(0);
  const [presupuestoRestante, setPresupuestoRestante] = useState(0);
  const [expandido, setExpandido] = useState(false);
  const [finances, setFinances] = useState([]);
  const tableRef = useRef(null); 
  const [showTable, setShowTable] = useState(false);

  //necesario para expandir los componentes
  const toggleDiv = () => {
    setExpandido(!expandido);
  };

  const handleUpdatePresupuestoRestante = () => {
    obtenerPresupuestoRestante();
  };

  const openTableInPopup = () => {
    const tableContent = document.getElementById('tabla-finanzas').outerHTML;
    const popupWindow = window.open('', '_blank', 'width=600,height=400');
    popupWindow.document.write('<html><head><title>Tabla de Finanzas</title>');
    popupWindow.document.write('<style>');
    popupWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        color: white;
        background-color:black;
      }
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 8px;
        border: 1px solid #ccc;
        text-align: left;
      }
      th {
        background-color: #3f3f41;
      }
    `);
    popupWindow.document.write('</style></head><body>');
    popupWindow.document.write('<h1>Tabla de Finanzas</h1>');
    popupWindow.document.write(tableContent);
    popupWindow.document.write('</body></html>');
    popupWindow.document.close();
  };

  useEffect(() => {
    obtenerPresupuesto();
    obtenerPresupuestoRestante();
    obtenerFinanzas();
  }, [userId]);

  const obtenerPresupuesto = async () => {
    try {
      setShowTable(true);
      const response = await axios.get(`http://localhost:3001/api/finances/${userId}`);
      if (response.data.success) {
        const finances = response.data.finances;
        const lastPresupuesto = finances.length > 0 ? finances[0].presupuesto : 0;
        setPresupuesto(lastPresupuesto);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener el último presupuesto:', error);
    }
  };

  const obtenerPresupuestoRestante = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/presupuesto-restante/${userId}`);
      if (response.data.success) {
        const presupuestoRestante = response.data.presupuestoRestante;
        setPresupuestoRestante(presupuestoRestante);
        obtenerFinanzas(); //aqui aprovecho de acrualizar la tabla finazas
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener el presupuesto restante:', error);
    }
  };

  const obtenerFinanzas = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/finances/${userId}`);
      if (response.data.success) {
        setFinances(response.data.finances);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  };

  const actualizarPresupuesto = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/presupuesto/${userId}`, {
        id_user: userId,
        presupuesto: nuevoPresupuesto,
      });
      if (response.data.success) {
        obtenerPresupuesto();
        obtenerPresupuestoRestante();
        setNuevoPresupuesto(0);
        alert('Presupuesto actualizado correctamente');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      alert('Error al guardar el presupuesto');
      console.error('Error al guardar el presupuesto:', error);
    }
  };

  return (
    <div>
      <PresupuestoCircular presupuesto={presupuesto} presupuestoRestante={presupuestoRestante} />
      <div className='relleno-div'>
        <p style={{ fontSize: "30px" }}>Presupuesto mensual: ${presupuesto}</p>
        <p style={{ fontSize: "30px" }}>Presupuesto restante: ${presupuestoRestante}</p>
        <button onClick={toggleDiv}>Actualizar Presupuesto ⌵</button>
        <div className={`div-expandible ${expandido ? 'expandido' : ''}`}>
          <div className="contenido">
            <label>Nuevo presupuesto: </label>
            <input className='letras-negro' type="number" value={nuevoPresupuesto} onChange={(e) => setNuevoPresupuesto(e.target.value)} />
            <br></br>
            <button onClick={actualizarPresupuesto}>Actualizar</button>
          </div>
        </div>
      </div>
      <div className='relleno-div'>
        <Gastos userId={userId} onUpdatePresupuestoRestante={handleUpdatePresupuestoRestante} />
        <Abonos userId={userId} onUpdatePresupuestoRestante={handleUpdatePresupuestoRestante} />

        <button onClick={openTableInPopup}>Ver transacciones ⌵</button>
        <div className='invisible'>
          {showTable && <TablaFinanzas finances={finances} ref={tableRef} />}
        </div>
      </div>
    </div>
  );
};

export default Presupuesto;

