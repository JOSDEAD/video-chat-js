import { Route, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { PureComponent, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { useDispatch } from "react-redux";
import { addStreams } from "../state/actions/streamActions";
import RTCPeerConnectionContext from "../context/rtcPeer";
const JoinRoom = ({ children, ...rest }) => {
  const { firestore } = useContext(FirebaseContext);
  const pc = useContext(RTCPeerConnectionContext);
  const dispath = useDispatch();
  const remoteStream = new MediaStream();
  const getVideoStreams = async () => {
    let localStream = navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        getRemoteDescription(stream);
        dispath(addStreams(stream, remoteStream));
      });
  };
  getVideoStreams();

  const getRemoteDescription = async (stream) => {
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });
    pc.addEventListener("track", async (event) => {
      console.log("entro");
      remoteStream.addTrack(event.track, remoteStream);
    });
    var mediaConstraints = {
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
      },
    };

    const { callId } = { ...rest }.computedMatch.params;
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");
    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };
    const callData = (await callDoc.get()).data();
    console.log(callData);
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer(mediaConstraints);
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });
  };

  offerCandidates.onSnapshot((snapshot) => {
    console.log("entro a offerCandidates join");
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        console.log("added join candidate", data);
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  return (
    <Route
      {...rest}
      render={() => {
        return children;
      }}
    />
  );
};

export default JoinRoom;
