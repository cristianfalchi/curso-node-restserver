const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // El objetivo de que cualquiera que venga a ver mi servidor, entienda que éstas son mis rutas, API o endpoints
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'

        // Antes de los middlewares puedo hacer la conexion a la base de datos
        this.conectarDb();

        // Middlewares (funciones que siempre se ejecutan cuando levantamos nuestro servidor)
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDb() {
        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

}

module.exports = Server;