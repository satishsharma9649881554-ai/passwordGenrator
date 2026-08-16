import { useCallback, useState,useEffect, useRef } from 'react'
function App() {
  const [length, setlength] = useState(6);
    const [numberAllowed, setnumberAllowed] = useState(false);
      const [charAllowed, setcharAllowd] = useState(false);
      const [password, setpassword] = useState("");

   

      const passwordGenrator = useCallback(()=>{
        let pass = "";
        let str = "QWERTYUIOPLKJHGFDSAZXCVBNMzxcvbnmlkjhgfdsaqwertyuiop"

        if(numberAllowed) str += "0123456789"

        if(charAllowed) str += "~!#$%^&*(}[)]{<?>/"

        for (let index = 1; index<=length; index++) {
             let passINdex = Math.floor(Math.random()*str.length) + 1;
               pass += str.charAt(passINdex)
          
        }
     setpassword(pass)

      },[length,numberAllowed,charAllowed])

    useEffect(()=>{
      passwordGenrator()
    },[length,numberAllowed,setpassword])


    const ref = useRef(null)
     const copyinputtext = useCallback(()=>{
    ref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenrator()
  },[length,numberAllowed,charAllowed,setpassword])


  return (
    <>
     <div className='w-full max-w-md grid grid-rows-4 bg-gray-600 p-6 mx-auto place-content-center my-6'> 
      <h1 className='row-span-1 text-2xl'>passwword Genrator</h1>
      <div className='row-span-2 grid place-items-center'>
        <input type="text"
         className='bg-black rounded-sm text-white'
         readOnly
         ref={ref}
         value={password}    
           />
      </div>
      <div className='grid'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e)=> setlength(e.target.value)} 
        className='cursor-pointer
        '/>
        <label>length:{length}</label>
      </div>
      <div>
        <input type="checkbox"
        defaultValue={numberAllowed}
        onChange={()=> setnumberAllowed(prev => !prev)}
        />
        <label>Number</label>
      </div>
      <div>
        <input type="checkbox"
        defaultValue={charAllowed}
        onChange={()=> setcharAllowd(prev => !prev)}
        />
        <label>Symbols</label>
      </div>
      <div className='grid row-span-1'>
        <button
      onClick={copyinputtext}
         className='text-xl rounded-2xl bg-blue-500 text-white'>Copy</button>
      </div>
     </div>
    </>
  )
}

export default App
