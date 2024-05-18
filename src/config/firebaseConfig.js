// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA-IJcO4KTsaJaxgi-QhtpHzqyVFxxAbLA',
    authDomain: 'notion-ca711.firebaseapp.com',
    projectId: 'notion-ca711',
    storageBucket: 'notion-ca711.appspot.com',
    messagingSenderId: '18084792747',
    appId: '1:18084792747:web:3e3b20e54db98ee236eaee',
    measurementId: 'G-KVRTYR3RH7',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);
export default firebase;
