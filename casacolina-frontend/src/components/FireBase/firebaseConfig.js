// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_JjWCd1vo6AQRedWOnbiu6sxPag_aBSo",
    authDomain: "casacolina-a5fa4.firebaseapp.com",
    projectId: "casacolina-a5fa4",
    storageBucket: "casacolina-a5fa4.appspot.com",
    messagingSenderId: "990976397648",
    appId: "1:990976397648:web:350af59de4295136ed9c55",
    measurementId: "G-T6KSGZX8Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)