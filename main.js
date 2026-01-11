import { guard } from "./guard.js";
guard();

import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const d = (await getDoc(doc(db,"users",auth.currentUser.uid))).data();
info.innerText = `${d.nick} | ${d.points}`;

window.check = ()=>{
 if(d.role==="player"){
  check.insertAdjacentHTML("afterend","<p style='color:red'>модерки нет</p>");
 }
 if(d.role==="moderator"){
  check.outerHTML='<button onclick="location.href=\'mod.html\'">панель модератора</button>';
 }
 if(d.role==="elder"){
  check.outerHTML='<button onclick="location.href=\'elder.html\'">панель старшего модератора</button>';
 }
};
