// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzcNcjwOAcvQCP32k_WoO02kt_i-9jqiA",
  authDomain: "stock-ncash.firebaseapp.com",
  projectId: "stock-ncash",
  storageBucket: "stock-ncash.appspot.com",
  messagingSenderId: "907897621587",
  appId: "1:907897621587:web:f8cc06c3521523f5778aa6",
  measurementId: "G-HEQPRQBLGH"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Exporta as instâncias necessárias
export { auth, GoogleAuthProvider, FacebookAuthProvider };
