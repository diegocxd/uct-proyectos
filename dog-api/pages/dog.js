import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Fotos_perros() {
  const [raza, setraza] = useState([]);
  const [SRaza, setSRaza] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const Razas = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      //console.log("razas");
      //console.log(data);
      //console.log(1)
      setraza(Object.keys(data.message));
    };
    Razas();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (SRaza) {
        const response = await fetch(`https://dog.ceo/api/breed/${SRaza}/images/random`);
        const data = await response.json();
        //console.log("imagen");
        //console.log(data);
        //console.log(3)
        setImage(data.message);
      }
    };
    fetchImages();
  }, [SRaza]);

  const Cambio_raza = (event) => {
    //console.log("cambio de raza");
    //console.log(event.target.value);
    //console.log(2)
    setSRaza(event.target.value);
  };

  const renderImage = () => {
    if (image) {
      //console.log(4)
      return <img src={image} height={400} weidht={400} alt={`Dog ${SRaza}`}  />;
    }
    return null;
  };

  const Borrar = () => {
    setImage("")
    setSRaza("")
    //setraza("")
  };

  return (
    <div>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 size="100">Fotos de Perros</h1>

      <div>
        <select value={SRaza} onChange={Cambio_raza}>
          <option value="">Selecciona una raza: </option>
          {raza.map((raza) => (
            <option key={raza} value={raza}>
              {raza}
            </option>
          ))}
        </select>
        {renderImage()}
      </div>
      <div>
        <button onClick={Borrar}>Limpiar</button>
      </div>
    </div>
  );
};
