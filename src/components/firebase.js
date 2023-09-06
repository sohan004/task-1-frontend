// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACW-aagopMjsBpePvABeTjnaxSj-1OniY",
    authDomain: "task-1-frontend.firebaseapp.com",
    projectId: "task-1-frontend",
    storageBucket: "task-1-frontend.appspot.com",
    messagingSenderId: "523076922241",
    appId: "1:523076922241:web:3dacf79f8136420f9bd680"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;