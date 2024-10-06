const http = require('http');
const getAutos = require('./autos/getAuto');
const postAuto = require('./autos/postAuto');
const putAuto = require('./autos/putAuto');
const deleteAuto = require('./autos/deleteAuto');
const getComics = require('./comics/getComic');
const postComic = require('./comics/postComic');
const putComic = require('./comics/putComic');
const deleteComic = require('./comics/deleteComic');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/autos') {
    switch (req.method) {
      case 'GET':
        getAutos(req, res);
        break;
      case 'POST':
        postAuto(req, res);
        break;
      case 'PUT':
        putAuto(req, res);
        break;
      case 'DELETE':
        deleteAuto(req, res);
        break;
      default:
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método no permitido');
    }
  } else if (pathname === '/comics') {
    switch (req.method) {
      case 'GET':
        getComics(req, res);
        break;
      case 'POST':
        postComic(req, res);
        break;
      case 'PUT':
        putComic(req, res);
        break;
      case 'DELETE':
        deleteComic(req, res);
        break;
      default:
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Método no permitido');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

