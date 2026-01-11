import { guard } from "./guard.js";
guard("elder");

import { db } from "./firebase.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const us = await getDocs(collection(db,"users"));
us.forEach(d=>{
 const u=d.data();
 users.innerHTML+=`
 ${u.email} | ${u.nick||"-"} | ${u.situation} | ${u.role} | ${u.points}
 <button onclick="ver('${d.id}')">verify</button>
 <button onclick="unver('${d.id}')">unverify</button>
 <button onclick="mod('${d.id}')">make mod</button>
 <input id="p${d.id}">
 <button onclick="pts('${d.id}')">points</button><br>`;
});

window.ver=id=>updateDoc(doc(db,"users",id),{situation:"verified"});
window.unver=id=>updateDoc(doc(db,"users",id),{situation:"requested"});
window.mod=id=>updateDoc(doc(db,"users",id),{role:"moderator"});
window.pts=id=>updateDoc(doc(db,"users",id),{
 points:+document.getElementById("p"+id).value
});

const fs = await getDocs(collection(db,"submits"));
fs.forEach(d=>{
 const f=d.data();
 files.innerHTML+=`
 ${f.fileName} — ${f.status}
 <button onclick="ok('${d.id}')">✔</button>
 <button onclick="no('${d.id}')">✖</button><br>`;
});

window.ok=id=>updateDoc(doc(db,"submits",id),{status:"approved"});
window.no=id=>updateDoc(doc(db,"submits",id),{status:"rejected"});
