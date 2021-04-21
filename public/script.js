//const { text } = require("express");

const socket = io('/') 

const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')

myVideo.muted = true;

let myVideoStream;
let peer = new Peer(undefined,  {
    path: '/peerjs',
    host: '/',
    port: '3000'
});
//const { create } = require("node:domain");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideosStream => {
            addVideoStream(video, userVideosStream)
        })
    })

    socket.on('user-connected', (userId) => {
        connecToNewUser(userId, stream);
    })
        
let text = $('input')

// every key in the keyboard has a number. enter is key 13
$('html').keydown((e) => {
    if (e.which == 13 && text.val().length !== 0) {
        console.log(text.val())
        socket.emit('message', text.val()); //socket.emit sends the message 
        text.val('') // this clears the message after enter has been pressed
    }
})

socket.on('createMessage', message => {
   $('ul').append(`<li class="message"><b> User: </b>${message} </li>`);
   scrollToBottom()
})
   })
peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


//sendingthe userour video stream
const connecToNewUser = (userId, stream) => {
   const call = peer.call(userId, stream)
   const video = document.createElement('video')
   call.on('stream', userVideosStream => {
       addVideoStream(video, userVideosStream)
   })
}



const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
   videoGrid.append(video)
}

const scrollToBottom = () => {
    let d = $('.main__chat_window');
    d.scrollTop(d.prop("scrollHeight"))
}

//mute video
const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled= false;
        setUnmuteButton()
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
    `
    document.querySelector('.main__mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
    `

    document.querySelector('.main__mute_button').innerHTML = html;
}


const playStop = () => {
   
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    } else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setStopVideo = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span> Stop Video</span>
    ` 
    document.querySelector('.main__video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
    <i class=" stop fas fa-video-slash"></i>
    <span> Play Video</span>
    ` 
    document.querySelector('.main__video_button').innerHTML = html;
}