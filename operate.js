const btn=document.getElementById('msg');
btn.addEventListener('keypress',(event)=>{
    if(event.keyCode===13){
        event.preventDefault();
        send();
    }
})

function addtext(text){
    const p = document.createElement('p');
    const txt=document.createTextNode(text);
    const write = document.getElementById("viewMessage");

    p.appendChild(txt);
    write.append(p);
    write.scrollTop = write.scrollHeight;
}

const socket = io("wss://terrific-enthusiasm-production.up.railway.app", {
    transports: ["websocket"], // ✅ Forces WebSocket connection
});

socket.on("connect", () => {
    console.log("Connected to WebSocket Server:", socket.id);
});

socket.on("start" , (v)=>{
    for(var i =0; i<v.length ; i++){
        addtext(v[i]);
    }
})

socket.on("msg", (message) => {
    console.log("New message:", message);
});

function send(){
    const mesage=document.getElementById("msg");
    const msg=mesage.value;
    mesage.value='';
    socket.emit('user-msg',msg);
}
socket.on('msg',(msg)=>{
    console.log(msg);
    addtext(msg);
})
