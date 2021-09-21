import { useDispatch } from 'react-redux';
import './App.css';
import Lobby from './pages/lobby';
import { addStreams } from './state/actions/streamActions';

function App() {
  const dispath = useDispatch();
  const handleCreate = async () =>{
      let localStream = await navigator.mediaDevices.getDisplayMedia({video:true,audio:true});
      const remoteStream = new MediaStream();
      dispath(addStreams(localStream,remoteStream))
  }
  return (
    <div className="App">
      <div className='container'>
          <button className='create' onClick={handleCreate}>Create</button>
          <button className='join'>Join</button>
      </div>
      <Lobby></Lobby>
    </div>
  );
}

export default App;
