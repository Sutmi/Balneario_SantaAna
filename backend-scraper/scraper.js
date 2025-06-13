const puppeteer = require('puppeteer');
/**
 * Realiza una búsqueda en Google usando Puppeteer y retorna los primeros 5 resultados.
 * @param {string} query - El término de búsqueda a consultar en Google.
 * @returns {Promise<Array<{title: string, url: string}>>} - Lista de enlaces con título y URL.
 */
async function searchGoogle(query) {
  // Lanzamos una instancia de navegador en modo headless (sin interfaz gráfica)
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      // Mejora seguridad en entornos restringidos (como servidores)
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // Evita detección de automatización
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();

  // Establecemos un user agent para parecer un navegador normal
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
  );
// Construimos la URL de búsqueda de Google con el query codificado
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });
// Esperamos que aparezcan resultados, con timeout de 5 segundos
  await page.waitForSelector('a h3', { timeout: 5000 }).catch(() => {
    throw new Error('No se encontraron resultados (puede haber CAPTCHA o error en Google)');
  });
// Extraemos los títulos y enlaces de los primeros resultados
  const results = await page.evaluate(() => {
    const links = [];
    document.querySelectorAll('a h3')?.forEach((h3) => {
      // Buscamos el elemento <a> más cercano
      const a = h3.closest('a');
      if (a && a.href) {
        links.push({
          title: h3.innerText,
          url: a.href
        });
      }
    });
    return links;
  });

    // Cerramos el navegador
  await browser.close();
    // Devolvemos los primeros 5 resultados
  return results.slice(0, 5);
}

// Exportamos la función para usarla en otros archivos
module.exports = { searchGoogle };
