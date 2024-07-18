const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/tasks.json'); // JSON 파일 경로
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
