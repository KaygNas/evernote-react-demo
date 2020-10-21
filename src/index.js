import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

import './reset.css';

firebase.initializeApp({
  apiKey: "AIzaSyCqzhlNYBI-HRYbAy_7O1TQUdtOVh-cnZ4",
  authDomain: "evernote-react-9d276.firebaseapp.com",
  databaseURL: "https://evernote-react-9d276.firebaseio.com",
  projectId: "evernote-react-9d276",
  storageBucket: "evernote-react-9d276.appspot.com",
  messagingSenderId: "268279524845",
  appId: "1:268279524845:web:f27de2e86c9c182ed34be4"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
