// Load .env variables into node enviroment
require('dotenv').config();

// Create helper functions globally
global.route = route => require(`./routes/${route}`)
global.model = model => require(`./models/${model}`)
global.middleware = middleware => require(`./middleware/${middleware}`)
global.startup = startup => require(`./startup/${startup}`)

const debug = require('debug')('ewallet:startup')
const config = require('config');
const http = require('http');
const app = require('./app');

// Get port from config and store in Express
const port = config.serverPort || 3000
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Start up server
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') throw error;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug('Port ' + port + ' requires elevated privileges');
      process.exit(1); 
      break;
    case 'EADDRINUSE':
      debug('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  console.log(`Server is running. Listening on port ${port}`);
}
