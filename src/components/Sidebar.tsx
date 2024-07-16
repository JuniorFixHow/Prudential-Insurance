import { LuUsers } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { useContext, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const {dispatch} = useContext(AuthContext);
  const [currentTab, setCurrentTab] = useState<string>('Employees');
  const openPublic = ()=>{
    setCurrentTab('Public')
    window.open('https://prudentialinsurance.netlify.app', '_blank');
  }
  const logout =()=>{
    dispatch({type:'LOGOUT'});
  }
  return (
    <div className='w-full border-b-2 border-slate-200 lg:border-r-2 lg:border-b-0 justify-center lg:justify-start items-start lg:items-center h-auto lg:min-h-screen lg:w-48 flex flex-row lg:flex-col gap-4 bg-white' >
        <div className="flex w-[90%] mt-0 lg:mt-16 lg:w-full py-4 lg:py-0 px-0 flex-row lg:flex-col justify-start lg:justify-center items-center lg:items-start gap-4 lg:gap-2">
            <div onClick={()=>setCurrentTab('Employees')} className={`flex w-fit cursor-pointer p-1 lg:px-4 hover:bg-red-100 lg:w-full flex-row items-center gap-1 md:gap-3 ${currentTab === 'Employees' && 'bg-red-100'}`}>
                <LuUsers />
                <span className="font-medium text-[0.9rem] md:text-[1rem] hidden md:block" >Employees</span>
            </div>
            <div onClick={openPublic} className={`flex w-fit cursor-pointer p-1 lg:px-4 hover:bg-red-100 lg:w-full flex-row items-center gap-1 md:gap-3 ${currentTab === 'Public' && 'bg-red-100'}`}>
                <CiGlobe />
                <span className="font-medium text-[0.9rem] md:text-[1rem] hidden md:block" >Public site</span>
            </div>
            <div onClick={logout} className={`flex w-fit cursor-pointer p-1 lg:px-4 hover:bg-red-100 lg:w-full flex-row items-center gap-1 md:gap-3 ${currentTab === 'Logout' && 'bg-red-100'}`}>
                <BiLogOutCircle />
                <span className="font-medium text-[0.9rem] md:text-[1rem] hidden lg:block" >Logout</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar