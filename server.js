const express=require('express');
const app=express();


const http=require('http');
const server=http.Server(app);
const socketio=require('socket.io');
const io=socketio(server);
app.use('/',express.static(__dirname+'/public'));
const UseridMap={};


const{
    db,messages
}=require('./dbconfig');

db.sync()
.then(()=>{
    server.listen(2334);
    console.log("server started");


})

io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on('login',(data)=>{
        UseridMap[socket.id]=data.username;
        
        socket.emit('login_done');
    })

    socket.on('chat_rcvd',(data)=>{
        const chatobj={

                username:UseridMap[socket.id],
                message:data.message
            }
        messages.create(chatobj)
        io.emit('send_chat',chatobj)
    })
})

app.use('/getchats',async (req,res)=>{
    const chat= await messages.findAll();
    res.send(chat);
})



