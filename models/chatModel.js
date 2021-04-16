const mongoose = require('mongoose')

const chatCollection = 'mensajes-23'

const chatSchema = new mongoose.Schema({

email: {type:String , require:true , max:150},
inputMensaje: {type:String, require:true},
nombre : {type:String, require:true},
apellido :{type:String, require:true},
edad : {type:Number , require:true},
alias : {type:String, require:true},
imagen: {type:String, require:true}

})

module.exports = mongoose.model(chatCollection , chatSchema)

