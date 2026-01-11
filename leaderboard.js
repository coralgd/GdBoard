import { guard } from "./guard.js";
guard();

import { db } from "./firebase.js";
import {
 collection, getDocs, query, where, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const q = query(
 collection(db,"users"),
 where("situation","==","verified"),
 orderBy("points","desc")
);

const s = await getDocs(q);
let i=1;

s.forEach(d=>{
 const u=d.data();
 let b="";
 if(u.role==="moderator") b=" 🛡";
 if(u.role==="elder") b=" 👑";
 list.innerHTML+=`${i}. ${u.nick}${b} — ${u.points}<br>`;
 i++;
});
