const path = require('path');
const { v4: uuidv4 } = require('uuid');

// usamos promesas cuando necesito que algo salga bien o salga mal
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        // yo se que existe porque ya lo controlo arriba
        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];


        // validar la extension
        if (!extensionesValidas.includes(extension)) {
           return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        }

        // renombrar el archivo con identificador unico
        uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

        // nombre temporal del archivo
        const nombreTemp = uuidv4() + '.' + extension;

        // construimos el path donde queremos almacenar el archivo que nos llega
        uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);                
            }

            // interesa el nombre del archivo y no el path completo dende esta alojado
            resolve(nombreTemp);
        });
    })
}


module.exports = {
    subirArchivo
}