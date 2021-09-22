import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ROOM } from "../constants/routes";
import FirebaseContext from "../context/firebase";
import { addStreams } from "../state/actions/streamActions";

const Lobby = () => {
      const dispath = useDispatch();
      const history = useHistory();
      const firestore = useContext(FirebaseContext);
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  // Global State
  const pc = new RTCPeerConnection(servers);
  const handleCreate = async () => {
    let localStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    dispath(addStreams(localStream, remoteStream));

    //Handle Database 
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
    history.push(`/room/${callDoc.id}`)
  };
  return (
    <div className="App">
      <div className="container">
        <button className="create" onClick={handleCreate}>
          Create
        </button>
        <button className="join">Join</button>
      </div>
    </div>
  );
}

export default Lobby