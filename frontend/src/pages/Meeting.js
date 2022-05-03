import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import { IconButton } from '@material-ui/core';

const Meeting = (props) => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    const [isMuted,setIsMuted] = useState(false)
    const [isVideoOn,setIsVideoOn] = useState(false)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect("http://localhost:5000/");
            socketRef.current.emit("join room", props.match.params.id);
            
            socketRef.current.on('other user', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", userID => {
                otherUser.current = userID;
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {

        const candidate = new RTCIceCandidate(incoming);
        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };

    const disconnect = ()=>{
        props.history.goBack();
    }

    const micToggle =()=>{
        setIsMuted(!isMuted)
    }

    const videoToggle =()=>{
        setIsVideoOn(!isVideoOn)
    }

    return (
        <div>
            <div style={{display:'inline-block',marginRight: '50px',marginTop: '90px'}}>
                <video autoPlay muted ref={userVideo} />
            </div>
            <video autoPlay muted ref={partnerVideo} />
            <div style={{margin: '20px auto'}}>
                <IconButton>
                    {isMuted?
                        <MicOffIcon 
                            onClick={micToggle} 
                            style= {{
                                backgroundColor:'#EA4335',
                                height:'30px',
                                width:'30px',
                                borderRadius:'30px',
                                padding:'10px'}}
                        />:
                        <MicIcon
                            onClick={micToggle}
                            style={{
                                height:'30px',
                                width:'30px',
                                borderRadius:'30px',
                                border: '1px solid #b2b2b2',
                                padding:'10px'
                            }}
                        />
                    }
                </IconButton>
                <IconButton>
                    <CallEndIcon 
                        onClick={disconnect} 
                        style={{backgroundColor:' #EA4335',height:'30px',width:'30px',borderRadius:'30px',padding:'10px'}}
                    />
                </IconButton>
                <IconButton>
                    {isVideoOn?
                        <VideocamOffIcon 
                            onClick={videoToggle} 
                            style= {{
                                backgroundColor:'#EA4335',
                                height:'30px',
                                width:'30px',
                                borderRadius:'30px',
                                padding:'10px'}}
                        />:
                        <VideocamIcon
                         onClick={videoToggle}
                         style={{
                            height:'30px',
                            border: '1px solid #b2b2b2',
                            width:'30px',
                            borderRadius:'30px',
                            padding:'10px'
                         }}
                         />
                    }
                </IconButton>
            </div>
            
          
        </div>
    );
};

export default Meeting;