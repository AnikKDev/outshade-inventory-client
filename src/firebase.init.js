// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZoLu4cf6XVLX8QGWCIy7aYhCFkMdMBcg",
    authDomain: "outshade-inventory-client.firebaseapp.com",
    projectId: "outshade-inventory-client",
    storageBucket: "outshade-inventory-client.appspot.com",
    messagingSenderId: "728363540245",
    appId: "1:728363540245:web:65fa10591c352e8369d31c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;