
import "./App.css";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from './constants/routes'
import RTCPeerConnectionContext from "./context/rtcPeer";
function App() {
  const Lobby = lazy(() => import('./pages/lobby'));
  const Room = lazy(() => import('./pages/room'));
  const pc = new RTCPeerConnection();
  return (
        <Router>
          <RTCPeerConnectionContext.Provider value={pc}>
          <Suspense fallback={<p>Loading ...</p>}> 
          <Switch>
             <Route path={ROUTES.ROOM} component={Room} />
             <Route path={ROUTES.LOBBY} component={Lobby} />
          </Switch>
          </Suspense>
          </RTCPeerConnectionContext.Provider>
        </Router>
  );
}

export default App;
