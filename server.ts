import { Socket } from 'dgram';
import express from 'express';
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


io.on('connection', (socket:any) => {

    socket.on('mensaje del chat', (data:any) =>{
        console.log(data)
        io.emit('mensaje del chat',data)
        const saveChat = new chatModel(data)
        saveChat.save()
    })

})


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
