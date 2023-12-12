// Mi retserver o webserber esta funcionando
// Toda la inicializacion de mi servidor quiero que quede almacenado en una clase
require('dotenv').config();
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});