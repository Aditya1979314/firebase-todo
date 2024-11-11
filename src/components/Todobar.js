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
    <div className="flex gap-2 justify-between items-center mt-1 bg-gray-100 p-2 w-full"> 
    <button onClick={onclickhandler} className="bg-red-400 hover:bg-red-300 rounded p-1 text-white">Del</button>
    <div >{title}</div>
    <Link to={`/todo/${to}`} className="cursor:pointer bg-green-400 hover:bg-green-300 rounded p-1 text-white">edit</Link>
    </div>
)
}