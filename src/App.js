import {useEffect, useState} from 'react'
import { db } from "./firebaseconfig.js";
import { collection,addDoc, getDocs } from 'firebase/firestore';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import { Main } from './components/Main.js';
import { Updatetodo } from './components/Updatetodo.js';

function App() {
const [todo,settodo] = useState('');
const [todos,settodos] = useState([]);

useEffect(()=>{
gettodos();
},[])

async function gettodos(){
  let dbtodos = await getDocs(collection(db,"cities"));
  let todoarr = [];
  dbtodos.forEach((obj)=>{
   todoarr.push({
   title: obj.data().title,
   id: obj.id
  });
  });
  settodos(todoarr);
  console.log(todos);
  }

async function onclickhandler(e){
try{
  const docRef = await addDoc(collection(db, "cities"), {
    title:todo
  });
   gettodos();
  console.log("todo created"+docRef)
}catch(err){
  console.log("some error occured"+err);
}
  
}

  return (
   <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main todos={todos} onclickhandler={onclickhandler} settodo={settodo} gettodos={gettodos}/>}/>
        <Route path='/todo/:id' element={<Updatetodo gettodos={gettodos}/>}/>
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
