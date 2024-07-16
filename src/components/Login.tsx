import React, { useContext, useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { IoLockClosedOutline, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FeedbackProps } from '../types/Types';
import axios from 'axios';
import { API } from '../constants/Constants';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginSingup() {
    const [showEye, setShowEye] = useState<boolean>(false);
    const [loginMode, setLoginMode] = useState<boolean>(true);
    const [showRepeat, setShowRepeat] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cPass, setCpass] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<FeedbackProps>({message:'', error:false});

    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
    const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            if(email.trim() !=='' && password.trim()!==''){
                const data ={email, password};
                const res = await axios.post(`${API}users/auth`, data);
                dispatch({type:'LOGIN_SUCCESS', payload:res.data});
                navigate("/");
                // console.log(res)
            }else{
                setFeedback({error:true, message:'Both email and password are required'})
            }
        } catch (error:unknown) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                setFeedback({ error: true, message: error.response?.data });
              } else {
                console.log(error);
                setFeedback({ error: true, message: 'An unknown error occurred' });
              }

        }finally{
            setIsLoading(false);
        }

    }

    const switchLogin = ()=>{
        setLoginMode(true);
        setFeedback({error:false, message:''});
    }
    const switchSignup = ()=>{
        setLoginMode(false);
        setFeedback({error:false, message:''});
    }

    const handleSignup = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        try {
            if(password.trim().length < 8){
                setFeedback({error:true, message:'Password must be at least 8 characters'})
            }else if(password !== cPass)
            {
                setFeedback({error:true, message:'Passwords mismatch'})
            }else{
                const data = {email, password};
                const res = await axios.post(`${API}users/create`, data);
                setLoginMode(true);
                setFeedback({error:false, message:res.data});
            }
        } catch (error:unknown) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                setFeedback({ error: true, message: error.response?.data });
              } else {
                console.log(error);
                setFeedback({ error: true, message: 'An unknown error occurred' });
              }
        }finally{
            setIsLoading(false);
        }
    }
    
  return (
    <div className='flex gap-8 flex-col lg:bg-white w-full lg:w-1/2 overflow-y-hidden  h-full items-center justify-center' >
        <div className="w-5/6 md:w-2/3 flex flex-col gap-6 self-center">

        <div className="flex mt-8 flex-col w-full">
            <span className='font-semibold text-2xl overflow-y-hidden' >{loginMode ? 'Login':'Create a new account'}</span>
            <span className="text-[0.8rem] md:text-[1rem] text-gray-400" >{loginMode ? 'Manage your data':'You will modify your data later'}</span>
        </div>
        <form onSubmit={loginMode ? handleLogin:handleSignup} className="flex gap-4 items-center w-full flex-col">
            <div className="flex p-2 flex-row gap-4 bg-slate-200 w-full rounded-xl">
                <div className="p-2 bg-white rounded-lg">
                    <AiOutlineMail color='blue' />
                </div>
                <input onChange={(e)=>setEmail(e.target.value)} className='px-2 grow bg-transparent border-none outline-none' placeholder='enter email' type="email" required />
            </div>
            <div className="flex p-2 items-center flex-row gap-4 bg-slate-200 w-full rounded-xl">
                <div className="p-2 bg-white rounded-lg">
                    <IoLockClosedOutline color='blue' />
                </div>
                <input onChange={(e)=>setPassword(e.target.value)} className='px-2 grow bg-transparent border-none outline-none' placeholder='enter password' type={showEye ? "text":"password"} required />
                {
                    showEye?
                    <IoEyeOffOutline className='cursor-pointer' onClick={()=>setShowEye(false)} />
                    :
                    <IoEyeOutline className='cursor-pointer' onClick={()=>setShowEye(true)} />
                }
            </div>
            {
                !loginMode &&
                <div className="flex p-2 items-center flex-row gap-4 bg-slate-200 w-full rounded-xl">
                    <div className="p-2 bg-white rounded-lg">
                        <IoLockClosedOutline color='blue' />
                    </div>
                    <input onChange={(e)=>setCpass(e.target.value)} className='px-2 grow bg-transparent border-none outline-none' placeholder='repeat password' type={showRepeat ? "text":"password"} required />
                    {
                        showRepeat?
                        <IoEyeOffOutline className='cursor-pointer' onClick={()=>setShowRepeat(false)} />
                        :
                        <IoEyeOutline className='cursor-pointer' onClick={()=>setShowRepeat(true)} />
                    }
                </div>
            }
            {
                feedback.message &&
                <span className={`font-medium ${feedback.error? 'text-red-500':'text-teal-500'}`} >{feedback.message}</span>
            }
            {
                loginMode ?
                <button disabled={isLoading} className={`${(isLoading && loginMode) ? 'bg-slate-500':'bg-[#1578FB]'} w-full text-white text-xl py-2 rounded-xl border-none hover:bg-blue-500`} type='submit' >{(isLoading && loginMode) ? 'Loading...':'Login'}</button>
                :
                <button disabled={isLoading} className={`${(isLoading && !loginMode) ? 'bg-slate-500':'bg-[#1578FB]'} w-full text-white text-xl py-2 rounded-xl border-none hover:bg-blue-500`} type='submit' >{(isLoading && !loginMode) ? 'Loading...':'Sign up'}</button>
            }
            {
                loginMode ?
                <span className="text-[0.8rem] md:text-[1rem] text-gray-400" >Don't have an account? <span onClick={switchSignup} className='cursor-pointer hover:underline text-[#1578FB]'>Sign up</span> </span>
                :
                <span className="text-[0.8rem] md:text-[1rem] text-gray-400" >Already have an account? <span onClick={switchLogin} className='cursor-pointer hover:underline text-[#1578FB]'>Login</span> </span>
            }
        </form>
        </div>
    </div>
  )
}

export default LoginSingup