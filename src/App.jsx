import { useEffect, useState,useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeNight } from "react-icons/md";
import { TiAdjustBrightness } from "react-icons/ti";


function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
 const [darkMode, setDarkMode] = useState(false);
 const [showfinshed,setshowfinshed]=useState(true);
 const sign = useRef(null);
  // Load from local storage on page load
  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      settodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleadd = () => {
    if (todo.trim() === "") return;
    let newTodos = [...todos, { id: uuidv4(), todo, iscomplete: false }];
    settodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    settodo("");
  };

  const handleedit = (e, id) => {
    let t = todos.find(i => i.id === id);
    settodo(t.todo);
    let newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);
    localStorage.setItem("todos", JSON.stringify(newtodos));
  };

  const handledelete = (e, id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      let newtodos = todos.filter(item => item.id !== id);
      settodos(newtodos);
      localStorage.setItem("todos", JSON.stringify(newtodos));
    }
  };

  const handlecheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newtodos = [...todos];
    newtodos[index].iscomplete = !newtodos[index].iscomplete;
    settodos(newtodos);
    localStorage.setItem("todos", JSON.stringify(newtodos));
  };

  const togglefinsh =(e)=>{
   setshowfinshed(!showfinshed);
  }
  const nightmode = () => {
    const newMode = !darkMode;  // Store the updated value
    setDarkMode(newMode);
   
    if (newMode) {
      document.body.style.background = 'radial-gradient(circle at center, #0a0a23, #000)';
      document.body.style.color = 'white';
      document.getElementById('nightmode').style.background = 'radial-gradient(circle,#2e026d,#000)';
       
      document.body.classList.add("bg-night-sky"); 
   
    } else {
    
      document.body.style.background = 'radial-gradient(circle, #75daff, #ff7eb3)';
      document.body.style.color = 'black';
      document.getElementById('nightmode').style.background = 'rgba(216,181,233,0.5)';
      document.body.classList.remove("bg-night-sky");
    }
};

  return (
    <>
      <nav className='navbar cursor-pointer bg-emerald-200 text-center w-full p-4 m-auto font-bold text-4xl relative bg-gradient-to-r from-blue-400 to-green-400 text-black ' ><div className="icon absolute bottom-[0px]"><img className='w-[70px]' src="/icon.png" alt="no" /></div>Todo List 
      {/* <div   onClick={nightmode} ref ={sign} className='absolute right-[15px] top-[20px]'><MdModeNight /></div>
       */}
      <div onClick={nightmode}  className='absolute right-[15px] top-[20px] cursor-pointer'>
        {darkMode ? <TiAdjustBrightness className='text-[40px] text-white'/> : <MdModeNight className='text-[30px] text-black'/>}
      </div>
      </nav>
 
      <div id='nightmode' className="starry-bg mt-5 rounded-2xl container md:w-[60vw] m-auto h-[86vh] overflow-y-scroll flex flex-col bg-[rgba(216,181,233,0.5)] p-4 shadow-lg">
        <div className="flex justify-center text-center">
          <h2 className="font-bold text-[20px] ">
           iTask - Manage your list
          </h2>
        </div>

        <div className="mt-5 flex justify-center space-x-3">
          <input onChange={(e) => settodo(e.target.value)} value={todo} type="text" spellCheck={false}
            className="border-2 bg-white border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-green-300 p-2 pl-4 text-black outline-none rounded-full w-[88%]"
            placeholder="Enter task..."
          />
          <button onClick={handleadd} className="cursor-pointer font-semibold p-2 px-5 rounded-full  bg-[#8438cf]  text-white hover:bg-violet-900 hover:font-semibold transition-all">
            Add
          </button>
        </div>
        <div className='flex md:pl-4 items-center p-2 gap-2 font-semibold mt-2'><input className='cursor-pointer' type="checkbox" onChange={togglefinsh} value={showfinshed} checked={showfinshed}/>Show All</div>
        <div className='w-[90%] bg-green-950 mx-auto h-[1px]'></div>
        <h2 className='font-bold mt-3 ml-4 text-[20px] '>Your Todos -</h2>
        <div className="boxes flex flex-col mt-2 gap-1 h-[63vh] overflow-y-scroll">
          {todos.length === 0 && <div className='text-center font-semibold text-[20px]'>No todos to show..</div>}
          {todos.map((item) => {
            return (showfinshed || !item.iscomplete) && <div key={item.id} id='task' className="box flex text-center gap-1 md:w-[55vw] mx-auto bg-violet-300 border border-black rounded-lg p-2">
              <input className='cursor-pointer' name={item.id} onChange={handlecheck} checked={item.iscomplete} type="checkbox" />
              <div className={`item w-[50vw] flex cursor-pointer items-center md:ml-2 mr-2 break-all ${item.iscomplete ? "line-through text-gray-500" : ""}`}>{item.todo}</div>
              <button onClick={(e) => { handleedit(e, item.id) }} className='cursor-pointer h-[35px] items-center font-semibold p-1 px-3 rounded-full bg-[#8000ff] text-white hover:bg-violet-900 transition-all duration-300 ease-in-out'><FaRegEdit /></button>
              <button onClick={(e) => { handledelete(e, item.id) }} className='cursor-pointer h-[35px] items-center font-semibold p-1 px-3 rounded-full bg-[#ff2807] text-white hover:bg-red-800 transition-all duration-300 ease-in-out'><RiDeleteBin6Line /></button>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App;
