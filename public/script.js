const socket=io();
socket.on('connect',()=>{
    console.log('socket created with id '+socket.id)
})

$(()=>{

    $('#chatbox').hide();
    $.get('/getchats',(data)=>{
        data.forEach((obj)=>{
            $('#chats').append(
                $('<li>').text(
                    `${obj.username}:${obj.message}`
                )
            )

        })
    })

    $('#login').click(()=>{
        socket.emit('login',{
            username:$('#username').val()
        })
    })

    socket.on('login_done',()=>{
        
        $('#loginbox').hide();
        $('#chatbox').show();

    })

    $('#send').click(()=>{
        socket.emit('chat_rcvd',{
            message:$('#msg').val()

        })
    })
    socket.on('send_chat',(data)=>{
        $('#chats').append(
            $('<li>').text(
                `${data.username}:${data.message}`
            )
        )
    })
})
