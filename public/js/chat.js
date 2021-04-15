const socket = io();
//Obtengo los elementos del html
const formularioChat = document.getElementById('formulario-chat')
const email = document.getElementById('email')
const inputMensaje = document.getElementById('mensaje')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const edad = document.getElementById('edad')
const alias = document.getElementById('alias')
const imagen = document.getElementById('imagen')
const mostrarmensaje = document.getElementById('mostrarMensajes')
var date = new Date()
let fecha = (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

formularioChat.addEventListener('submit', (event) =>{
    event.preventDefault()
        socket.emit('mensaje del chat', { 
        inputMensaje : inputMensaje.value,
        email : email.value,
        nombre:nombre.value,
        apellido:apellido.value,
        edad: edad.value,
        alias:alias.value,
        imagen:imagen.value
        })
        inputMensaje.value = ''
        })

    socket.on('mensaje del chat',(data)=>{
 
 mostrarmensaje.innerHTML += `<p><span class ="email" >${data.email}</span>,<span class='hora'>[${fecha}] </span> : <span class= 'message'> ${data.inputMensaje} </span> </p>`

})
