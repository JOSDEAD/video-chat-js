import { useContext, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Video from "../components/video"
import RTCPeerConnectionContext from "../context/rtcPeer"

const RoomContainer=styled.div`
    min-height: 100vh;
    display: flex;
    height: 100vh;
    background: black;
    @media screen and (max-width: 1000px) {
          flex-direction: column;
      }
`

const Room = () => {
    // peer connection
    const pc = useContext(RTCPeerConnectionContext);
    const {localStream,remoteStream} = useSelector(state => state.stream)
    const localVideo = useRef();
    const remoteVideo = useRef();
    useEffect(()=>{
    if(localStream && localVideo){
        localVideo.current.srcObject = localStream;
            localStream.getTracks().forEach(track => {
                pc.addTrack(track,localStream);
            });
            pc.ontrack = event => {
                event.streams[0].getTracks().forEach(track => {
                    remoteStream.addTrack(track);
                });
            };
        }
    },[localStream])
    return (
        <RoomContainer>
            <Video reference={localVideo} autoPlay playsInline></Video>
            <Video reference={remoteStream} autoPlay playsInline></Video>
        </RoomContainer>
    )
}

export default Room