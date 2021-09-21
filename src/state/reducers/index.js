import { combineReducers } from "redux"
import streamReducer from "./streamReducer"
const appReducers = combineReducers({
    stream: streamReducer
})

export default appReducers;