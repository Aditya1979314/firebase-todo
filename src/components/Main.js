import { signOut } from "../firebaseconfig"
import { Todobar } from "./Todobar"
import { auth } from "../firebaseconfig"





export function Main({todos,onclickhandler,settodo,gettodos}){


async function logouthandler(){
    try{
        await signOut(auth);
        console.log("signout executed");
    }catch(err){
        console.log("some error occured")
    }
    
}

    return (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="p-8 shadow-xl rounded">
        <div className="flex flex-col gap-1 ">
          <input className="border border-blue-100 border-2" onChange={(e)=>settodo(e.target.value)}/>
          <button onClick={onclickhandler} className="bg-blue-400 rounded px-2 py-1 text-white hover:bg-blue-300">SUBMIT</button>
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
          {
            (todos.length > 0) && (
            todos.map((obj)=>{
              return <Todobar title={obj.title} to={obj.id} gettodos={gettodos}/>
            }))
          }
          <button onClick={logouthandler} className="bg-sky-400 hover:bg-sky-300 px-2 py-1 text-white rounded mt-2">Logout</button>
          </div>
          </div>
          </div>
    )
}