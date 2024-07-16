import { Modal } from '@mui/material'
import React from 'react'
import { UserProps } from '../types/Types'
import axios from 'axios'
import { API } from '../constants/Constants'

type CardProps = {
    currentData:UserProps | null,
    setCurrentData: React.Dispatch<React.SetStateAction<UserProps | null>>
}

const Card = ({currentData, setCurrentData}:CardProps) => {
    const deleteEmployee =async()=>{
        try {
            setCurrentData(null);    
            const res = await axios.delete(`${API}users/${currentData?._id}`);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Modal
  open={currentData !== null}
  onClose={()=>setCurrentData(null)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
 <div onClick={()=>setCurrentData(null)} className="flex cursor-pointer w-full h-full items-center justify-center">
 <div className="flex w-5/6 md:w-2/3 lg:w-1/2 p-4 rounded-xl z-10 cursor-default bg-white flex-col gap-4 items-center">
    <img src={currentData?.photo} className='w-20 h-20 rounded-full object-cover' alt="photo" />
    <div className='overflow-y-scroll lg:overflow-y-hidden overflow-x-hidden h-80 w-full' >
        <div className="flex flex-col gap-4 w-full  ">
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Staff name<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.name || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Gender<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.gender || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Email<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.email || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Department<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.department || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Title<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.title || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Role<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{currentData?.role || 'Not set'}</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between">
                <span className='font-semibold text-blue-700 flex-1 text-[0.9rem] md:text-[1rem] flex' >Last Certificate Date<span className='hidden md:flex' >:</span> </span>
                <span className='font-medium flex flex-1 text-[0.9rem] md:text-[1rem]' >{ currentData?.lcd ? new Date(currentData?.lcd).toLocaleDateString() : 'Not set'}</span>
            </div>
        </div>
    </div>

    <div className="flex flex-row items-center justify-between w-full">
        <button onClick={()=>setCurrentData(null)} type='button' className='border border-slate-200 px-3 py-1 rounded cursor-pointer hover:bg-slate-200' >Close</button>
        <button onClick={deleteEmployee} type='button' className='border-none px-3 py-1 rounded bg-red-600 cursor-pointer hover:bg-red-300 text-white' >Delete</button>
    </div>
</div> 
 </div>
</Modal>
  )
}

export default Card