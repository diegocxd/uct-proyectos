import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PresupuestoCircular = ({ presupuesto, presupuestoRestante }) => {
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartInstance.current) {
      // Destruir el gráfico anterior si existe
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Presupuesto Utilizado', 'Presupuesto Restante'],
        datasets: [
          {
            data: [presupuesto - presupuestoRestante, presupuestoRestante],
            backgroundColor: ['#7a0000', '#026312'],
            hoverBackgroundColor: ['#7a0000', '#026312'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [presupuesto, presupuestoRestante]);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }} className='derecha-grafico'>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default PresupuestoCircular;





