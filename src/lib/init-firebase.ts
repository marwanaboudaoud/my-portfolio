// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaN3zntdCkfD9fXdPr5fUzyfF94Ju9e9M",
    authDomain: "my-portfolio-81c83.firebaseapp.com",
    projectId: "my-portfolio-81c83",
    storageBucket: "my-portfolio-81c83.appspot.com",
    messagingSenderId: "1054251689977",
    appId: "1:1054251689977:web:5fd73eba2fb5ef053aff28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app)

