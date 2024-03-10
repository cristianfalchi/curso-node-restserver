
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); //Voy a ocupar mi modelo
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    // Por si algo sale mal
    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ // el return hace que no siga ejecutando el codigo
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        // Actualmente jsonwebtoken no tiene una promesa (await, async) para generear el JWT. 
        // Posee un callback para ello. Por lo tanto genero una funcion que haga de promesa

        const token = await generarJWT(usuario.id); // quiero que esto trabaje en base a promesas

        res.json({
            usuario,
            token
        })

    } catch (error) {  // Sirve para que la aplicacion no se caiga
        console.log(error);
        return res.status(500).json({ // Internal Server Error
            msg: 'Algo salió mal. Hable con el administrador'
        })
    }

}

module.exports = {
    login
}