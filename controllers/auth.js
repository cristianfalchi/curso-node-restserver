const { response, request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const generarJWT = require('../helpers/generar-JWT');
const { googleVerify } = require('../helpers/google-verify');

const authLogin = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password incorrect - correo",
            })
        }

        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password incorrect - estado: false ",
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password incorrect - password",
            })
        }

        // generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ // internal server error
            msg: 'Hable con el administrador'
        })
    }
}

const authGoogleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        // verificamos que el usuario se encuentre en nuestra DB
        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            // tengo que crearlo
            const data = {
                // los campos obligatorios
                nombre,
                correo,
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save()
        } else {
            // si el usuario ha sido borrado o bloqueado.
            if (!usuario.estado) {
                return res.status(400).json({
                    msg: 'Hable con el administrador, usuario bloqueado'
                });
            }
        }

        // generar jwt
        const token = await generarJWT(usuario.uid);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}

module.exports = {
    authLogin,
    authGoogleSignIn
}