// Los paquetes de terceros van aqui arriba, porque tienen mas importancia en teoria
// el orden sería: paquetes de node nativos, paquetes de terceros y luego nuestro codigo.
require('dotenv').config();


const Server = require('./models/server');

// Instancia del Servidor
const server = new Server();

// Levantamos el servidor
server.listen();