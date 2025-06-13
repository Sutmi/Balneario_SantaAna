// index.js

// Carga de módulos necesarios
const express = require('express');// Framework para crear servidor HTTP
const cors = require('cors');// Middleware para permitir peticiones cruzadas (CORS)
const { searchGoogle } = require('./scraper');// Función que hace scraping de resultados en Google

const app = express();
const PORT = 3002;

app.use(cors()); // Habilita CORS para que Angular pueda conectarse

// Endpoint de búsqueda
app.get('/google-search', async (req, res) => {
  const query = req.query.q;// Obtenemos el parámetro de búsqueda desde la URL
  // Validación: si no hay query, respondemos con error
  if (!query) {
    return res.status(400).json({ error: 'Falta el parámetro "q"' });
  }

  try {
     // Realiza la búsqueda y responde con los resultados
    const results = await searchGoogle(query);
    res.json(results);
  } catch (err) {
    console.error('Error al hacer scraping:', err);
    res.status(500).json({ error: 'Ocurrió un error al buscar en Google' });
  }
});
// ▶Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Endpoint específico para obtener información del Balneario Santa Ana
// Hace una búsqueda en Google, filtra enlaces relevantes y los retorna en texto plano
app.get('/balneario-info', async (req, res) => {
  try {
    // Llama al propio endpoint de búsqueda para reutilizar la lógica
    const results = await axios.get('http://localhost:3002/google-search?q=Balneario Santa Ana Tulancingo precios');
     // Filtro inteligente: selecciona solo enlaces que parezcan relevantes
    const enlaces = results.data
      .filter(link => link.title.toLowerCase().includes('precios') || link.url.includes('facebook.com'))
      .map(link => `🔗 ${link.title}\n${link.url}`)
      .join('\n\n');

    res.send(`Aquí tienes la información más reciente que encontré sobre precios y servicios del Balneario Santa Ana:\n\n${enlaces}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('No se pudo obtener la información del balneario.');
  }
});


