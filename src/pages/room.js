import { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Video from "../components/video";
import RTCPeerConnectionContext from "../context/rtcPeer";

const RoomContainer = styled.div`
  min-height: 100vh;
  display: flex;
  height: 100vh;
  background: black;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Room = () => {
  // peer connection
  const pc = useContext(RTCPeerConnectionContext);
  const { localStream, remoteStream } = useSelector((state) => state.stream);
  console.log(localStream, remoteStream);
  const localVideo = useRef();
  const remoteVideo = useRef();
  useEffect(() => {
    if (localStream && remoteStream && localVideo && remoteVideo) {
      localVideo.current.srcObject = localStream;
      console.log("remoteStream", remoteStream);
      remoteVideo.current.srcObject = remoteStream;

    }
  }, [localStream, remoteStream,pc]);
  return (
    <RoomContainer>
      <Video reference={localVideo} autoPlay playsInline mute={true}></Video>
      <Video reference={remoteVideo} autoPlay playsInline></Video>
    </RoomContainer>
  );
};

export default Room;
