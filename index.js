// Load .env variables into node enviroment
require('dotenv').config();

// Create helper functions globally
global.route = route => require(`./routes${route}`)
global.model = model => require(`./models${model}`)
global.middleware = middleware => require(`./middleware${middleware}`)
global.startup = startup => require(`./startup${startup}`)

const config = require('config');
const http = require('http');
const app = require('./app');

// Get port from config and store in Express
app.set('port', config.serverPort || 3000);

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
      console.error('Port' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port' + port + ' is already in use');
      process.exit(1);
      break;
    case 'ECONNREFUSED':
      console.log('Unable to connect to connect to port or external resource')
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  console.log(`Server is running. Listening on port ${addr}`);
}
