// Importación de módulos necesarios
const express = require('express');// Framework web para Node.js
const nodemailer = require('nodemailer'); // Módulo para enviar correos electrónicos
const cors = require('cors');// Middleware para permitir peticiones desde otros dominios

const app = express();// Inicializa la aplicación Express
const PORT = 3000;// Puerto donde correrá el servidor
// Middleware
app.use(cors()); // Permite solicitudes de cualquier origen (CORS)
app.use(express.json()); // Permite parsear JSON en las solicitudes POST

// Ruta POST para recibir datos y enviar correo
app.post('/enviar-correo', async (req, res) => {
  // Extrae los datos enviados desde el formulario
  const { name, phone, email, tipoReserva, numeroPersonas, checkIn, checkOut, comentarios } = req.body;
// Configuración del transporte para enviar correos con Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Servicio de correo: Gmail
    auth: { 
      user: 'tu_correo@gmail.com', // Correo del remitente
      pass: 'tu_contraseña' // Contraseña de aplicación de Gmail
    }
  });

  // Contenido y configuración del correo
  const mailOptions = {
    from: 'tu_correo@gmail.com', // Remitente (puede ser el mismo que el de auth)
    to: 'tu_correo@gmail.com',  // Destinatario
    subject: 'Nueva reservación',// Asunto del correo
    // Cuerpo del mensaje en formato HTML
    html: `
      <h3>Reservación</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tipo de Reserva:</strong> ${tipoReserva}</p>
      <p><strong>Número de Personas:</strong> ${numeroPersonas}</p>
      <p><strong>Check In:</strong> ${checkIn}</p>
      <p><strong>Check Out:</strong> ${checkOut}</p>
      <p><strong>Comentarios:</strong> ${comentarios}</p>
    `
  };
// Intenta enviar el correo con los datos proporcionados
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Correo enviado correctamente' });// Respuesta exitosa
  } catch (error) {
    res.status(500).send({ message: 'Error al enviar el correo' });// Error al enviar
  }
});
// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
