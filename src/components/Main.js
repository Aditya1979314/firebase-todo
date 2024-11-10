import { Todobar } from "./Todobar"




export function Main({todos,onclickhandler,settodo,gettodos}){

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",flexDirection:'column',gap:"2",marginTop:"12rem"}}>
        <div style={{display:'flex',flexDirection:'column',gap:'2'}}>
          <input style={{padding:"1rem"}} onChange={(e)=>settodo(e.target.value)}/>
          <button onClick={onclickhandler} style={{padding:"0.2rem 0.4rem",backgroundColor:"blue",marginTop:"4px"}}>SUBMIT</button>
        </div>
        <div style={{overflow:'scroll',width:"200px",marginTop:"4px"}}>
          {
            (todos.length > 0) && (
            todos.map((obj)=>{
              return <Todobar title={obj.title} to={obj.id} gettodos={gettodos}/>
            }))
          }
          </div>
          </div>
    )
}