import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function guard(role=null){
 onAuthStateChanged(auth, async u=>{
  if(!u) location.href="index.html";

  const s = await getDoc(doc(db,"users",u.uid));
  const d = s.data();

  if(d.situation!=="verified"){
   location.href="nick.html";
   return;
  }

  if(role && d.role!==role && d.role!=="elder"){
   location.href="main.html";
  }
 });
}
