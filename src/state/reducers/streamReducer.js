import { ADD_STREAMS } from "../actions/streamActions";
const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_STREAMS:
            return action.payload
        default:
            return state;
    }
}

export default streamReducer;