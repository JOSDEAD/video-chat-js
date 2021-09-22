import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './state/store';
import FirebaseContext from './context/firebase';
import {firestore} from './firebase/index';
ReactDOM.render(
    <Provider store={store}>
    <FirebaseContext.Provider value={{ firestore }}>
      <App />
    </FirebaseContext.Provider>
    </Provider>,
  document.getElementById('root')
);
