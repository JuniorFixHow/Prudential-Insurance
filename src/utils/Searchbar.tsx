import React from "react";
import { CiSearch } from "react-icons/ci";

type SearchProps = {
    setSearch:React.Dispatch<React.SetStateAction<string>>
}

const Searchbar = ({setSearch}:SearchProps) => {
  return (
    <div className=" flex-row flex w-full items-center justify-center bg-white py-4" >
        <div className="flex w-[90%] items-center lg:justify-between flex-col gap-2 lg:flex-row">
            <span className="font-semibold text-[0.9rem] md:text-[1rem] self-start" >Employees</span>
            <div className="flex py-1 px-2 border items-center  border-slate-200 flex-row rounded self-end">
                <CiSearch />
                <input onChange={(e)=>setSearch(e.target.value)} className='px-1 text-[0.8rem] md:text-[1rem] outline-none border-none grow' type="text" placeholder="serach..." />
            </div>
        </div>
    </div>
  )
}

export default Searchbar