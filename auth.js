import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const msg = document.getElementById("msg");

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("registerBtn").addEventListener("click", register);

/* ВХОД */
async function login() {
  msg.innerText = "";

  const e = emailEl.value.trim();
  const p = passEl.value;

  if (!e || !p) {
    msg.innerText = "Введите email и пароль";
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, e, p);
    await route(cred.user.uid);
  } catch (err) {
    msg.innerText = "Ошибка входа";
    console.error(err);
  }
}

/* РЕГИСТРАЦИЯ */
async function register() {
  msg.innerText = "";

  const e = emailEl.value.trim();
  const p = passEl.value;

  if (!e || p.length < 6) {
    msg.innerText = "Пароль минимум 6 символов";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, e, p);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: e,
      nick: "",
      situation: "not",
      role: "player",
      points: 0
    });

    location.href = "nick.html";
catch (err) {
  console.error(err);
  msg.innerText = err.code + " : " + err.message;
}

  }
}

/* РЕДИРЕКТ */
async function route(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  const d = snap.data();

  if (d.situation === "verified") {
    location.href = "main.html";
  } else {
    location.href = "nick.html";
  }
}

