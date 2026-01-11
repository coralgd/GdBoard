import { auth, db } from "./firebase.js";
import {
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.go = async () => {
 const e = email.value;
 const p = password.value;

 try {
  const c = await signInWithEmailAndPassword(auth,e,p);
  route(c.user.uid);
 } catch {
  const c = await createUserWithEmailAndPassword(auth,e,p);
  await setDoc(doc(db,"users",c.user.uid),{
   email:e, nick:"", situation:"not", role:"player", points:0
  });
  location.href="nick.html";
 }
};

async function route(uid){
 const d = await getDoc(doc(db,"users",uid));
 if(d.data().situation==="verified") location.href="main.html";
 else location.href="nick.html";
}
