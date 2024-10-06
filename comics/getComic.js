const fs = require('fs').promises;

async function getComics(req, res) {
  try {
    const data = await fs.readFile('comics.txt', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error al leer el archivo de comics');
  }
}

module.exports = getComics;
