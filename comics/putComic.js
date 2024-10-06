const fs = require('fs').promises;

async function putComic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const updateId = url.searchParams.get('id');
  if (!updateId) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('ID es requerido para actualizar');
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const updatedComic = JSON.parse(body);
      const data = await fs.readFile('comics.txt', 'utf-8');
      const comics = JSON.parse(data);

      if (comics[updateId]) {
        comics[updateId] = { ...comics[updateId], ...updatedComic };
        await fs.writeFile('comics.txt', JSON.stringify(comics, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Comic actualizado', id: updateId }));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Comic no encontrado');
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error al actualizar comic');
    }
  });
}

module.exports = putComic;
