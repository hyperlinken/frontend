const btn=document.getElementById('msg');
replyshow = document.getElementById("replied");

btn.addEventListener('keypress',(event)=>{
    if(event.keyCode===13){
        event.preventDefault();
        send();
    }
})


document.getElementById("viewMessage").addEventListener("mousedown", function (event) {
    replyshow.innerText = "";
    if (event.target.id === "rpl") { // Check if clicked element is <p>
        makeDraggable(event.target);
    }
});

function addtext(text){
    const p = document.createElement('p');
    const rpl = document.createElement('div');
    
    const txt = document.createTextNode(text.message);

    p.setAttribute("id" , "reply");
    rpl.setAttribute("id" , "rpl")
    
    const write = document.getElementById("viewMessage");

    if( text.replied != ''){
        rplshow = document.createElement('div');
        rplshow.innerText = text.replied + ": ";
        rplshow.setAttribute("id" , "rplshow")
        rpl.append(rplshow);
    }
    p.appendChild(txt);
    rpl.append(p);
    write.append(rpl);
    makeDraggable(p);
    write.scrollTop = write.scrollHeight;
    replyshow.innerText = '';
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
    const msg = {message: mesage.value ,replied: replyshow.innerText};           //ye string se list banaya
    mesage.value='';
    socket.emit('user-msg',msg);
}
socket.on('msg',(msg)=>{
    console.log(msg);
    addtext(msg);
})

socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
});
