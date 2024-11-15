import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebaseconfig";



export function Upload(){
const[pdf,setpdf]  = useState();
const[file,setfile] = useState();

function onchangehandler(e){
const url = URL.createObjectURL(e.target.files[0]);
setfile(e.target.files[0]);
}

async function onclickhandler(){
    try{
        const storageref = ref(storage,'notes/resume.pdf');
        await uploadBytes(storageref,file);
        const downloadurl = await getDownloadURL(ref(storage,'notes/resume.pdf'));
        console.log(downloadurl);
        setpdf(downloadurl)
        console.log('file uploaded')
    }catch(err){
        console.log("some error occured"+err);
    }
}

    return (
        <div className="flex justify-center items-center gap-2 h-screen">
            <div className="flex">
            <input className="border border-black" placeholder="upload the file" type="file" onChange={onchangehandler}/>
            <button onClick={onclickhandler} className="px-4 py-2 bg-sky-400 hover:bg-sky-300 text-white rounded ">submit</button>
            </div>
            <iframe src={pdf} className="border border-2 border-gray-200 w-1/3 h-2/3"></iframe>
        </div>
    )
}