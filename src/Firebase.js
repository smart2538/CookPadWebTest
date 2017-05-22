import firebase from 'firebase';

const config = {
  apiKey: ' AIzaSyBpJVOkM1mMAguLGuvw9Dl_8m6UhNMhLr4',
  authDomain: 'cookpadtest-e2a9f.firebaseio.com',
  databaseURL: 'https://cookpadtest-e2a9f.firebaseio.com/',
  storageBucket: 'gs://cookpadtest-e2a9f.appspot.com/'
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();