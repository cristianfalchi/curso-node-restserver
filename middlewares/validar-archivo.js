
const {response} = require('express');

const validarArchivoSubir = (req, res = response, next) => {

    // SI NO existe el objeto 'files', SI NO existen propiedades dentro del objeto 'files', 
    // SI NO existe la propiedad 'archivo' dentro del objeto 'files'
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    next();

}

module.exports = {
    validarArchivoSubir
}