let socket = io.connect();
const buttonToAll = document.querySelector('.sendAll');
const buttonSendToMe = document.querySelector('.sendToMe');
const target = document.querySelector('.target');
const guest = document.querySelector('.guests');

const username = prompt('Welcome! Please choose an username:');
socket.emit('sendUserName', (username));

buttonToAll.addEventListener('click', () => {
    const message = document.querySelector('#message').value;
    const messageObj = {
       message: message,
       username: username,
       self: false     
    }
    if(message !== '') {
        socket.emit('sendToAll', (messageObj));
        message.textContent = '';
    }
})

buttonSendToMe.addEventListener('click', () => {
    const message = document.querySelector('#message').value;
    const messageObj = {
        message: message,
        username: username,
        self: true 
     }
    if(message !== '') {
        socket.emit('sendToMe', (messageObj));
        message.textContent = '';
    }
})

socket.on('displayMessage', (messageObj) => {
   const list = document.createElement('li');
   list.textContent = messageObj.username + ': ' +messageObj.message;
   if(messageObj.self) {
       list.classList.add('self');
   }
   target.appendChild(list)
});

socket.on('displayUsername', (guests) => {
    guest.textContent = guests;
});
