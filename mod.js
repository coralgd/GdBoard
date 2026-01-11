import { guard } from "./guard.js";
guard("moderator");

import { db } from "./firebase.js";
import {
 collection, getDocs, query, where, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* USERS */
const uq = query(
 collection(db,"users"),
 where("situation","==","verified"),
 where("role","==","player")
);

const us = await getDocs(uq);
us.forEach(d=>{
 const u=d.data();
 users.innerHTML+=`
 ${u.nick} (${u.points})
 <input id="p${d.id}">
 <button onclick="chg('${d.id}')">изменить</button><br>`;
});

window.chg=id=>{
 updateDoc(doc(db,"users",id),{
  points:+document.getElementById("p"+id).value
 });
};

/* FILES */
const fs = await getDocs(collection(db,"submits"));
fs.forEach(d=>{
 const f=d.data();
 if(f.status!=="pending") return;
 files.innerHTML+=`
 ${f.fileName}
 <button onclick="ok('${d.id}')">✔</button>
 <button onclick="no('${d.id}')">✖</button><br>`;
});

window.ok=id=>updateDoc(doc(db,"submits",id),{status:"approved"});
window.no=id=>updateDoc(doc(db,"submits",id),{status:"rejected"});
