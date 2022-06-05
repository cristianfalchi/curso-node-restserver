const express = require('express')
var cors = require('cors')
const path = require('path');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();

        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        // connection DB
        this.conectarDB();

        // Setting
        this.setting();

        // middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // setting files statics
        this.app.use(express.static('public'));
        this.app.use(cors());
        // la info que viene hacia el backend viene desde un json
        this.app.use(express.json());
    }

    setting() {
        // setting port
        this.app.set('port', process.env.PORT);
    }

    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server listening: ", this.app.get('port'));
        });
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }

}

module.exports = Server;