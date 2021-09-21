import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"


const Lobby = () => {
    const {localStream} = useSelector(state => state.stream)
    const video = useRef();
    useEffect(()=>{
        if(localStream){
            video.current.srcObject = localStream;
        }
    },[localStream])
    return (
        <>
            <video ref={video} autoPlay playsInline></video>
        </>
    )
}

export default Lobby