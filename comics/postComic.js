const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

async function postComic(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const newComic = JSON.parse(body);
      let data;
      try {
        data = await fs.readFile('comics.txt', 'utf-8');
      } catch {
        data = '{}';
      }
      const comics = data ? JSON.parse(data) : {};
      const id = uuidv4();
      comics[id] = newComic;

      await fs.writeFile('comics.txt', JSON.stringify(comics, null, 2));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Comic agregado', id }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error al agregar comic');
    }
  });
}

module.exports = postComic;
