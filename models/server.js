const express = require('express')
var cors = require('cors')
const path = require('path');


class Server {

    constructor() {
        this.app = express();
        this.usuariosPath = '/api/usuarios'

        // Setting
        this.setting();

        // middlewares
        this.middlewares();

        // Rutas
        this.routes();
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
       this.app.use(this.usuariosPath, require('../routes/usuarios')); 
    }

}

module.exports = Server;