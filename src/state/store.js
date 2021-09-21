import { createStore } from "redux";
import appReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  appReducers,
  composeWithDevTools()
);
