import {useEffect, useRef, useState} from 'react'
import { auth, db } from "./firebaseconfig.js";
import { collection,addDoc, getDocs } from 'firebase/firestore';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import { Main } from './components/Main.js';
import { Updatetodo } from './components/Updatetodo.js';
import { Login } from './components/Login.js';
import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { Upload } from './components/Upload.js';

function App() {
const [todo,settodo] = useState('');
const [todos,settodos] = useState([]);
const [user,setuser] = useState('');


useEffect(() => {
  // Listen for authentication state changes
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setuser(currentUser);
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
}, []);


useEffect(() => {
  // Fetch documents only if user is authenticated
  const fetchDocuments = async () => {
    if (user) {
      try {
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
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    } else {
      settodos([]); // Clear documents if user logs out
    }
  };

  fetchDocuments();
}, [user]);

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
      <div className='bg-black p-4 text-white flex justify-center items-center gap-2'>
        <Link to={'/'} className='hover:text-red-400'>Todos</Link>
        <Link to={'/login'} className='hover:text-red-400'>Login</Link>
        <Link to={'/upload'} className='hover:text-red-400'>upload</Link>
      </div>
      <Routes>
        <Route path='/' element={<Main todos={todos} onclickhandler={onclickhandler} settodo={settodo} gettodos={gettodos}/>}/>
        <Route path='/todo/:id' element={<Updatetodo gettodos={gettodos}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
