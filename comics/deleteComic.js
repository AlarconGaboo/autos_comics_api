const fs = require('fs').promises;

async function deleteComic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const deleteId = url.searchParams.get('id');
  if (!deleteId) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('ID es requerido para eliminar');
    return;
  }

  try {
    const data = await fs.readFile('comics.txt', 'utf-8');
    const comics = JSON.parse(data);

    if (comics[deleteId]) {
      delete comics[deleteId];
      await fs.writeFile('comics.txt', JSON.stringify(comics, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Comic eliminado', id: deleteId }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Comic no encontrado');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error al eliminar comic');
  }
}

module.exports = deleteComic;
