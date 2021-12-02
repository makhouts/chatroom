let socket = io.connect();
const buttonToAll = document.querySelector('.sendAll');
const target = document.querySelector('.target');


buttonToAll.addEventListener('click', () => {
    const message = document.querySelector('#message').value;
    socket.emit('sendToAll', (message));
})

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>'+message;
});

