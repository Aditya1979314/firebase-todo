import { useState } from "react"
import { auth, provider, signInWithPopup } from "../firebaseconfig";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";



export function Login(){
const [user,setuser] = useState();
const [email,setemail] = useState('');
const [password,setpassword] = useState('');

async function  onclickhandler() {
    return signInWithPopup(auth, provider);
}

async function  onsubmithandler() {
    try{
        await signInWithEmailAndPassword(auth,email,password);
        alert("user logged in ");
    }catch(err){
        console.log("some error occured"+err);
    }
}

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-1">
            <button onClick={onclickhandler} style={{backgroundColor:"#40c057",padding:"0.8rem 1.6rem",color:"white",border:"none",cursor:"pointer"}}>Login with Google</button>
            <input placeholder="Enter email" onChange={(e)=>setemail(e.target.value)} className="border border-2 border-black p-2"/>
            <input placeholder="Enter password" onChange={(e)=>setpassword(e.target.value)} className="border border-2 border-black p-2"/>
            <button onClick={onsubmithandler} className="px-2 py-1 bg-black text-white rounded hover:bg-gray-500">submit</button>
        </div>
    )
}