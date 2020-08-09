//IMPORTO LOS MODULOS NECESARIOS
const usersRoute = require('./routes/users.route')
const autorRoute = require("./routes/autor.route")
const libroRoute = require('./routes/libro.route')
const mongoose = require('mongoose');
const express = require("express")
require('dotenv').config()
const server = express();



//MIDDLEWARES
server.use(express.json())

//ROUTER
server.get("/ping", (req, res) => {
    res.headersSent
    res.send("pong")
})

usersRoute(server)
autorRoute(server)
libroRoute(server)

//MANEJO DE ERRORES GENERALES
server.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
})

//INICIO DEL SERVIDOR
async function iniciarServidor() {
    mongoose.connect(process.env.DB_HOST + process.env.DB_DATABASE,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(r => {
        server.listen(process.env.PORT, () => {
            console.log("Servidor Iniciado en el puerto " + process.env.PORT)
        })
    }).catch(error => {
        console.log(error)
        console.log("NO Pude conectar a la base de datos")
    })
}

iniciarServidor();