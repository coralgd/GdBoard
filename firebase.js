import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ТВОЯ КОНФИГУРАЦИЯ */
export const firebaseConfig = {
  apiKey: "AIzaSyCJkIl_Kuiz_8xfCVG1WJMF3T3UTs5N5-Q",
  authDomain: "spin-gdboard.firebaseapp.com",
  projectId: "spin-gdboard",
  storageBucket: "spin-gdboard.firebasestorage.app",
  messagingSenderId: "975189835146",
  appId: "1:975189835146:web:b7378d3ee2b09794e81c73"
};

/* ИНИЦИАЛИЗАЦИЯ */
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
