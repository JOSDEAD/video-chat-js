
import "./App.css";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from './constants/routes'
import RTCPeerConnectionContext from "./context/rtcPeer";
import JoinRoom from "./helpers/joinRoom";
function App() {
  const Lobby = lazy(() => import('./pages/lobby'));
  const Room = lazy(() => import('./pages/room'));
  //TODO: Add it to constants
  const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302',"stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302",                                                                                                                              
      "stun:stun3.l.google.com:19302",
      "stun:stun4.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

  const pc = new RTCPeerConnection(servers);
  return (
        <Router>
          <RTCPeerConnectionContext.Provider value={pc}>
          <Suspense fallback={<p>Loading ...</p>}> 
          <Switch>
             <Route path={ROUTES.ROOM} component={Room} />
             <JoinRoom path={'/join/:callId'}>
               <Room/>
             </JoinRoom>
             <Route path={ROUTES.LOBBY} component={Lobby} />
          </Switch>
          </Suspense>
          </RTCPeerConnectionContext.Provider>
        </Router>
  );
}

export default App;
