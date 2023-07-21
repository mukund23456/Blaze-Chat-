 const socket=io('http://localhost:8000');

 const form=document.getElementById('send-cont')
 const messageinput=document.getElementById('messageinp')
 const messageoutput=document.querySelector('.cont')

//ask user for his/her name
 const name = prompt("enter your name to join ");
 socket.emit('new-user-joined',name);

const append=(message,position)=>{
    const messagelement=document.createElement('div');
    messagelement.innerText=message;
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    messageoutput.append(messagelement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    const message = messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';
})
//if new user joins ,receive the event from server
 socket.on('user-joined',data=>{
append(`${name} joined the chat `,`right`)
 })

 //if server sends a msg receive it 

 socket.on('receive', data=>{
    var msger = `${data.message}`;
  console.log(msger.length);
  if (name.length == 0) {
    append(`Anonymous: ${data.message}`, 'left');
  } else {
    append(`${data.name}: ${data.message}`, 'left')
  }
})

// if user leaves the chat 
socket.on('left', name=>{
    append(`${name } left the chat`, 'right');
})