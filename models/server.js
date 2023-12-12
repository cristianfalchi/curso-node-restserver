const express = require('express');
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // El objetivo de que cualquiera que venga a ver mi servidor, entienda que éstas son mis rutas o API
        this.usuariosPath = '/api/usuarios';

        // Middlewares (funciones que siempre se ejecutan cuando levantamos nuestro servidor)
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del body
        this.app.use( express.json() );
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

}

module.exports = Server;
