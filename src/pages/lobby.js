import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import FirebaseContext from "../context/firebase";
import { addStreams } from "../state/actions/streamActions";
import RTCPeerConnectionContext from "../context/rtcPeer";
const Lobby = () => {
      const dispath = useDispatch();
      const history = useHistory();
      const {firestore} = useContext(FirebaseContext);
      const pc = useContext(RTCPeerConnectionContext);
      console.log(firestore);
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
  const handleCreate = async () => {
    let localStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    dispath(addStreams(localStream, remoteStream));

   localStream.getTracks().forEach(track => {
                pc.addTrack(track,localStream);
            });
                  pc.addEventListener("track", async (event) => {
          console.log('entro');
        remoteStream.addTrack(event.track, remoteStream);
      });
    //Handle Database TODO: CUSTOM HOOK
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    // Get candites for caller (offer)
    pc.onicecandidate = event => {
      console.log(event,'event');
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    }
   var mediaConstraints = {'mandatory': {
                      'OfferToReceiveAudio':true, 
                      'OfferToReceiveVideo':true }};

    //Create offer TODO: CUSTOM HOOK
    const offerDescription = await pc.createOffer(mediaConstraints);
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type
    }
    await callDoc.set({offer});

    callDoc.onSnapshot((snapshot) => {
      console.log('Entro a calldoc lobby');
      const data = snapshot.data();
     console.log('data',data); 
      if(!pc.currentRemoteDescription && data?.answer){
        const answerDescription = new RTCSessionDescription(data.answer);
        console.log('remote answer description',answerDescription);
        pc.setRemoteDescription(answerDescription);
      }
    })
    //When answered add candidate to peer connection
    answerCandidates.onSnapshot(snapshot => {
      console.log('Entro a snapshot answerCandidates lobby');
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            console.log('Entro a snapshot added lobby');
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        })
    })

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