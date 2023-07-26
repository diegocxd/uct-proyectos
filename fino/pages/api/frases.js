import React, { useState, useEffect } from 'react';

const Frases = () => {
  const [frases, setFrases] = useState([
    "El dinero no da la felicidad pero procura una sensación tan parecida que necesita un especialista muy avanzado para verificar la diferencia. -Woody Allen",
    "El dinero no es la única respuesta, pero hace una diferencia. -Barack Obama",
    "Tenga lo que tenga, gaste menos. -Samuel Johnson",
    "Si eres el tipo de persona que está esperando que ocurra ‘lo correcto’, puede que esperes por un largo tiempo. Es como esperar que todas las luces de tráfico estén verdes antes de comenzar el viaje. -Robert Kiyosaki",
    "El amigo ha de ser como el dinero, que antes de necesitarle, se sabe el valor que tiene. -Sócrates",
    "El dinero no lo es todo, pero como quiera que sea, ocupa el primer lugar en la lista de prioridades. -Warren Buffett",
    "Si queréis ser ricos no aprendáis solamente a saber cómo se gana, sino también cómo se invierte. -Benjamin Franklin",
    "La Bolsa es un juego que consiste en ir pasando de unos a otros una cerilla encendida, hasta que llega a uno que se quema los dedos. -John F. Kennedy",
    "El precio es lo que pagas. El valor es lo que recibes. -Warren Buffett",
    "Muchísima gente se ha vuelto pesimista por financiar a optimistas. -C.T. Jones",
    "El mercado puede permanecer irracional más tiempo del que usted puede permanecer solvente. -John Maynard Keynes",
    "Un banco es un lugar que te presta dinero si puedes probar que no lo necesitas. -Bob Hope",
  ]);
  const [fraseActual, setFraseActual] = useState("");

  useEffect(() => {
    actualizarFrase();
  }, []);

  const actualizarFrase = () => {
    const randomIndex = Math.floor(Math.random() * frases.length);
    const fraseActual = frases[randomIndex];
    setFraseActual(fraseActual);
  }

  return (
    <div className='abajo-frase'>
      <button  onClick={actualizarFrase}>{fraseActual}</button>
    </div>
  );
}

export default Frases;

