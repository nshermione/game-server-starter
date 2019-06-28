import {loadConfig} from './config';
import * as http from 'http';
import {createLogger, logger} from './services/logger';
import {createWebSocket} from './services/socket';

function createServer() {
  let server = http.createServer(function (request, response) {
    logger.debug((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
  });
  server.listen(8080, function () {
    logger.debug((new Date()) + ' Server is listening on port 8080');
  });
  return server;
}

loadConfig()
  .then(() => createLogger())
  .then(() => createServer())
  .then((server) => createWebSocket(server));
