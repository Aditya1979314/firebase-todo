import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../firebaseconfig";




export function Updatetodo({gettodos}){
const [title,settitle] = useState('');
const params = useParams();


async function  onclickhandler() { 
    try{
        console.log(params.id);
        const docref = doc(db,'cities',params.id);
        await updateDoc(docref,{
            title:title
        })
        gettodos();
        alert("title updated");
    }catch(err){
        console.log("some error occured");
    }
}

    return (
        <div>
            <input placeholder={title} type="text" onChange={(e)=>settitle(e.target.value)}/>
            <button onClick={onclickhandler}>Update</button>
        </div>
    )
}