const jwt = require('jsonwebtoken');

// puede ser asincrono pero voy a generar una promesa manualmente porque trabajo con callback
const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid }; // objeto literal, un buffer o una cadena que represente un JSON válido

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { //opciones
            expiresIn: '4h'
        }, (err, token) => { // callback de error
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}