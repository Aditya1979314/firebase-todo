import { deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom"
import { db } from "../firebaseconfig";


export function Todobar({title,to,gettodos}){


async function onclickhandler() {
    try{
        const docref = doc(db,'cities',to);
        await deleteDoc(docref);
        gettodos();
    }catch(err){
        console.log("some error occured");
    }
}

return (
    <div style={{display:"flex",gap:2,marginBottom:"2px"}}> 
    <button style={{backgroundColor:"red",padding:"0.1rem 0.2rem",color:"white"}} onClick={onclickhandler}>Delete</button>
    <div style={{backgroundColor:'black', color:'white', padding:'4px',width:"100%"}}>{title}</div>
    <Link to={`/todo/${to}`} style={{backgroundColor:"blue",padding:"0.1rem 0.2rem",color:"white",textDecoration:"none"}}>edit</Link>
    </div>
)
}