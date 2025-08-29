import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

const [currState,setCurrState]=useState("Sign up")
const [fullName,setFullName]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [bio,setbio]=useState("")
const [isDataSubmitted,setIsDataSubmitted]=useState(false)


const {login}=useContext(AuthContext)


const onSubmitHandler=(event)=>{
 event.preventDefault();

if(currState === "Sign up" && !isDataSubmitted){
  setIsDataSubmitted(true)
  return;
}
login(currState==="Sign up"?'signup':'login',{fullName,email,bio,password})
}

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center
    gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur'>
      {/*------------left----------------*/}
      <img src={assets.logo_icon} alt="" className='w-[min(30vw,250px)]'/>
      {/*------------right----------------*/}
      <form onSubmit={onSubmitHandler} className='border-2 bg-black/80 text-white border-gray-500 p-6 flex
      flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}

        {isDataSubmitted && ( <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} className='w-5 cursor-pointer' alt="" />)}

         
          </h2>

          {currState=== "Sign up"&& !isDataSubmitted &&(<input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required/>)}
          
          {!isDataSubmitted && (
            <>
            <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder='Email address' required className='
            p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500'/>

             <input onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder='password' required className='
            p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500'/>
            </>
          )}
          {
            currState==="Sign up" && isDataSubmitted && (
              <textarea onChange={(e)=>setbio(e.target.value)} value={bio} rows={4} className=' p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-indigo-500'placeholder='Tell us something about you...' required></textarea>
            )
          }
          <button type='submit' className='py-3 bg-gradient-to-r from-[#7FFFD4] to-gray-500 text-white rounded-md cursor-pointer'>
            {currState==="Sign up"? "Create Account" : "Login"}
          </button>
      
          <div className='flex items-center gap-2 text-sm text-gray-500'> 
            <input type="checkbox" />
            <p>Agree to the terms and condition</p>
          </div>

          <div className='flex flex-col gap-2'>
             {currState==="Sign up"?(<p className='text-sm text-gray-600'>
              Already have an account ? <span onClick={()=>{setCurrState("Login");setIsDataSubmitted(false)}} className='font-medium text-[#7FFFD4] cursor-pointer'>
                Login here
              </span>
             </p>):(<p className='text-sm text-gray-600'>
             Don't have an account ? <span onClick={()=>{setCurrState("Sign up")}} className='font-medium text-[#7FFFD4] cursor-pointer'>Create now</span>
             </p> )}
          </div>
      </form>
    </div>
  )
}

export default LoginPage
