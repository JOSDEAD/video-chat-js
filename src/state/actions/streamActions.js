export const ADD_STREAMS = 'ADD_SREAMS';

export const addStreams = (localStream,remoteStream) => {
    return {    
        type: ADD_STREAMS,
        payload: {
            localStream,
            remoteStream
        }
    }
}