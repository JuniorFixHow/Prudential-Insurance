import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../constants/Constants';
import { UserProps } from '../types/Types';
import { IoIosOpen } from "react-icons/io";
import { SearchQuery } from '../functions/Search';

type TableProps = {
    setCurrentData:React.Dispatch<React.SetStateAction<UserProps | null>>,
    search:string,
}
export const UsersTable = ({setCurrentData, search}:TableProps) => {
    // const {searchItem} = useContext(SearchContext);
    const [rows, setRows] = useState<UserProps[]>([]);

    useEffect(()=>{
        const fetchUsers = async()=>{
            const users = await axios.get(API+'users');
            setRows(users.data.sort((a:UserProps, b:UserProps)=>a.createdAt < b.createdAt ? 1:-1));
        }
        fetchUsers()
    },[rows])


   
   
    const columns = [
       
        
        {
            field:'photo',
            headerName: '',
            width: 80,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className=" mt-2">
                        <img src={params.row.photo} alt='pic' className="w-10 h-10 object-cover rounded-full" />
                    </div>
                )
            }
        },
       
        {
            field:'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <div className="cellWithImg">
                        <span onClick={()=>setCurrentData(params.row)} className="hover:underline cursor-pointer">{params.row?.name}</span>
                    </div>
                )
            }
        },
       
        {
          field: 'department',
          headerName: 'Department',
          width: 150,
        },

        
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        
        {
            field:'_id',
            headerName: 'Open',
            width: 20,
            renderCell: (params:GridRenderCellParams)=>{
                return(
                    <>
                    {
                        
                        <IoIosOpen onClick={()=>setCurrentData(params.row)} size={20} color='grey' style={{cursor:'pointer'}} />
                    }
                    </>
                )
            }
        },
        
      ];

    return(
        <div className='w-[95%] bg-white p-4'>
            {
                rows.length ?
                <DataGrid
                    getRowId={(row:UserProps)=>row._id}
                    rows={SearchQuery(rows, search)}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                :
                <span className='text-2xl font-semibold text-center w-full overflow-hidden' >No Data</span>
            }
    </div>
    )


}