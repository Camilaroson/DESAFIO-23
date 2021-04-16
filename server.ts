import { Socket } from 'dgram';
import express from 'express';
import { model } from 'mongoose';
import { normalize, schema } from 'normalizr';
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.static('public'))
const chatModel = require('./models/chatModel')


// routers
app.get('/chat',(req,res)=>{
    res.sendFile(__dirname+'/public/chat.html');
})

//socket
io.on('connection', (socket:any) => {

    socket.on('mensaje del chat', (data:any) =>{
        console.log(data)
        io.emit('mensaje del chat',data)
        const saveChat = new chatModel(data)
        saveChat.save()
        //normalizr
        const usuarios = new schema.Entity('usuarios');
        const mensajesSchema = new schema.Entity('mensajes')
        const postSchema = new schema.Entity('canal de chat',{
            author:usuarios,
            mensaje: mensajesSchema
        })
        const Normalizar = normalize(data,[postSchema]);
        console.log(JSON.stringify(Normalizar))
    
    })

})


//VER COMO ARREGLAR EL TEMA DE CONVERTIR A JSON LOS DATOS DE MONGO. 


//conexión
http.listen(3333, () => {
    mongoose.connect('mongodb://localhost:27017/desafios',
    {
     useNewUrlParser: true, 
     useUnifiedTopology: true
    }
   )

   .then( () => console.log('Todo ok'))
   .catch((err:any) => console.log(err))
})
