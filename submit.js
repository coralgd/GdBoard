import { db, auth } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.send = ()=>{
 const r=new FileReader();
 r.onload=()=>addDoc(collection(db,"submits"),{
  uid:auth.currentUser.uid,
  fileName:f.files[0].name,
  fileData:r.result,
  status:"pending",
  time:Date.now()
 });
 r.readAsDataURL(f.files[0]);
};
