const { response, request } = require('express'); // Aqui solo creamos funciones y las exportamos
const bcryptjs = require('bcryptjs'); // Para encriptar la contraseña
const Usuario = require('../models/usuario'); // Para crear instancias de mi modelo Usuario

const usuariosGet = async (req = request, res = response) => {

    // los query params express los parsea y me los da en una variable
    const { desde = 0, limite = 5 } = req.query; // configuramos valores por defecto si no mandan los parametros
    const query = { estado: true };
    // const usuarios = await Usuario.find({estado : true})
    //     .skip(desde)
    //     .limit(Number(limite));

    // Cuantos registros tengo en esa coleccion
    // const total = await Usuario.countDocuments({estado : true});

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(Number(limite))
    ])

    console.log(Number(limite));
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    // los parametros express los parsea y me los da en una variable

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body; // Voy a extraer todo lo que NO necesite grabar si me lo envia

    // TODO validar contra base de datos

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(/*valor 10  por defecto*/);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // Mando unicamente el objeto
    res.json(usuario);
}


const usuariosPost = async (req, res = response) => {

    // const body = req.body;    
    const { nombre, correo, password, rol } = req.body;
    // Creo la instancia de Usuario
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(/*valor 10  por defecto*/);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        usuario
    })
}


const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    })
}

// Como voy a exportar muchos controladores, lo exporto como un objeto
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}