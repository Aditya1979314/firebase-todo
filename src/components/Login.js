import { useState } from "react"
import { auth, provider, signInWithPopup } from "../firebaseconfig";
import { signInWithRedirect } from "firebase/auth";



export function Login(){
const [user,setuser] = useState();

async function  onclickhandler() {
    return signInWithPopup(auth, provider);
}

    return (
        <div style={{height:"100vh", display:"flex",justifyContent:"center",alignItems:"center"}}>
            <button onClick={onclickhandler} style={{backgroundColor:"#40c057",padding:"0.8rem 1.6rem",color:"white",border:"none",cursor:"pointer"}}>Login with Google</button>
        </div>
    )
}