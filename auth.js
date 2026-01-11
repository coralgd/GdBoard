import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* DOM */
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const msgEl = document.getElementById("msg");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

/* события */
loginBtn.addEventListener("click", login);
registerBtn.addEventListener("click", register);

/* ========== ВХОД ========== */
async function login() {
  msgEl.textContent = "";

  const email = emailEl.value.trim();
  const password = passEl.value;

  if (!email || !password) {
    msgEl.textContent = "Введите email и пароль";
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await routeAfterAuth(cred.user.uid);
  } catch (err) {
    console.error(err);
    msgEl.textContent = mapError(err);
  }
}

/* ========== РЕГИСТРАЦИЯ ========== */
async function register() {
  msgEl.textContent = "";

  const email = emailEl.value.trim();
  const password = passEl.value;

  if (!email) {
    msgEl.textContent = "Введите email";
    return;
  }

  if (password.length < 6) {
    msgEl.textContent = "Пароль минимум 6 символов";
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: email,
      nick: "",
      situation: "not",
      role: "player",
      points: 0
    });

    location.href = "nick.html";
  } catch (err) {
    console.error(err);
    msgEl.textContent = mapError(err);
  }
}

/* ========== РЕДИРЕКТ ========== */
async function routeAfterAuth(uid) {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    const data = snap.data();

    if (!data || data.situation !== "verified") {
      location.href = "nick.html";
    } else {
      location.href = "main.html";
    }
  } catch (err) {
    console.error(err);
    msgEl.textContent = "Ошибка чтения профиля";
  }
}

/* ========== ТЕКСТЫ ОШИБОК ========== */
function mapError(err) {
  if (!err || !err.code) return "Неизвестная ошибка";

  switch (err.code) {
    case "auth/email-already-in-use":
      return "Этот email уже зарегистрирован";
    case "auth/invalid-email":
      return "Некорректный email";
    case "auth/weak-password":
      return "Слабый пароль";
    case "auth/user-not-found":
      return "Аккаунт не найден";
    case "auth/wrong-password":
      return "Неверный пароль";
    case "auth/operation-not-allowed":
      return "Email/Password отключён в Firebase";
    case "auth/network-request-failed":
      return "Ошибка сети";
    default:
      return err.message;
  }
}
