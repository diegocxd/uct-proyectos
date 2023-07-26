const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fino'
  });


connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
  } else {
    console.log('Conexión exitosa a la base de datos MySQL');
  }
});
//##################################################################
// LOGIN
//##################################################################
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = [username, password];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al realizar la autenticación' });
    } else {
      if (results.length > 0) {
        const id_user = results[0].id_user;
        res.json({ success: true, message: 'Inicio de sesión exitoso', id_user });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    }
  });
});

//##################################################################
// finances
//##################################################################
app.get('/api/finances/:id_user', (req, res) => {
  const id_user = req.params.id_user;
  const query = 'SELECT * FROM finances WHERE id_user = ?';
  const values = [id_user];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al obtener las finanzas' });
    } else {
      res.json({ success: true, finances: results });
    }
  });
});

//##################################################################
// presupuesto
//##################################################################
app.post('/api/presupuesto/:id_user', (req, res) => {
  const { id_user, presupuesto } = req.body;
  const query = 'UPDATE finances SET presupuesto = ? WHERE id_user = ? AND gastos = 0 AND abonos = 0';
  const values = [presupuesto, id_user];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al guardar el presupuesto' });
    } else {
      res.json({ success: true, message: 'Presupuesto actualizado exitosamente' });
    }
  });
});

app.get('/api/presupuesto-restante/:id_user', (req, res) => {
  const id_user = req.params.id_user;
  const query = `SELECT presupuesto - SUM(gastos) + SUM(abonos) AS presupuesto_restante
                 FROM finances
                 WHERE id_user = ? AND MONTH(fecha) = MONTH(CURDATE())`;
  const values = [id_user];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al obtener el presupuesto restante' });
    } else {
      const presupuestoRestante = results[0].presupuesto_restante;
      res.json({ success: true, presupuestoRestante });
    }
  });
});

//##################################################################
// gastos
//##################################################################
app.post('/api/gastos', (req, res) => {
  const { id_user, monto, motivo } = req.body;
  const query = 'INSERT INTO finances (id_user, id_transaccion, gastos, abonos, presupuesto, motivo, fecha) VALUES (?, 0, ?, 0, 0, ?, CURDATE())';
  const values = [id_user, monto, motivo];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al registrar el gasto' });
    } else {
      res.json({ success: true, message: 'Gasto registrado exitosamente' });
    }
  });
});



//##################################################################
// abonos
//##################################################################
app.post('/api/abonos', (req, res) => {
  const { id_user, monto, motivo } = req.body;
  const query = 'INSERT INTO finances (id_user, id_transaccion, gastos, abonos, presupuesto, motivo, fecha) VALUES (?, 0, 0, ?, 0, ?, CURDATE())';
  const values = [id_user, monto, motivo];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ success: false, message: 'Error al registrar el abonos' });
    } else {
      res.json({ success: true, message: 'Abono registrado exitosamente' });
    }
  });
});

//##################################################################
// subir el servidor
//##################################################################
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
