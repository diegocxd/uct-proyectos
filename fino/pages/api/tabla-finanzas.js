import React from 'react';
import DescargarExel from './descargar';

import moment from 'moment'; //para poner mas bonita la fecha

const TablaFinanzas = ({ finances }) => {
  return (
    <div id="tabla-finanzas">
      <DescargarExel data={finances} filename="tabla_finanzas.xlsx" buttonText="Descargar Tabla" />
      <table>
        <thead>
          <tr>
            <th>Gastos</th>
            <th>Abonos</th>
            <th>Motivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {finances.slice(1).map((finance) => (
            <tr key={finance.id_transaccion}>
              <td>{finance.gastos}</td>
              <td>{finance.abonos}</td>
              <td>{finance.motivo}</td>
              <td>{ moment(finance.fecha).format("DD-MM-YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaFinanzas;
