const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => { // identificador unico del usuario

    return new Promise((resolve, reject) => {

        const payload = { uid }; // lo que voy a grabar en el payload del token

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });

    })

}

module.exports = generarJWT;