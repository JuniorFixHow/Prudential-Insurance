import { useContext, useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AuthContext } from "../context/AuthContext";
import { FeedbackProps } from "../types/Types";
import axios from "axios";
import { API } from "../constants/Constants";
import { Alert } from "@mui/material";

const Profile = () => {
  const profilephoto = "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";
  const [dateTime, setDateTime] = useState<string>(new Date().toISOString().slice(0, 16));
  const [hasMadeChanges, setHasMadeChanges] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackProps>({message:'', error:false});
  const [name, setName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [photo, setPhoto] = useState<File>();
  // const [password, setPassword] = useState<string>('');
  const {dispatch, state} = useContext(AuthContext);

  useEffect(()=>{
    setHasMadeChanges(true);
  },[name, department, role, title, gender, dateTime])
  useEffect(()=>{
    if(state.user?.lcd){
      setDateTime( new Date(state.user?.lcd).toISOString().slice(0, 16))
    }
  },[])

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
  };

  const logout =()=>{
    dispatch({type:'LOGOUT'})
  }

  const photoRef = useRef<HTMLInputElement | null>(null)

  const uploadPhoto = async()=>{
    setFeedback({error:false, message:''});
    if(photo){
      try {
        const data = new FormData();
          data.append('file', photo);
          data.append('upload_preset', 'Joseph');
          let url;
              const uploadFile = await axios.post('https://api.cloudinary.com/v1_1/juniorfixhow/image/upload', data)
              url = uploadFile.data.url;
          const req = {photo:url}
          const res = await axios.put(`${API}users/${state?.user?._id}`, req);
          dispatch({type:'LOGIN_SUCCESS', payload:res.data});
          setFeedback({error:false, message:'Image uploaded successfully'});
          // console.log(res.data);
        } catch (error) {
          console.log(error);
          setFeedback({error:true, message:'Error occured uploading image. Retry'});
      }
    }
      
  }
  const removePhoto = async()=>{
    setFeedback({error:false, message:''});
    try {
      const res = await axios.put(`${API}users/${state?.user?._id}`, {photo:profilephoto});
      dispatch({type:'LOGIN_SUCCESS', payload:res.data})
    } catch (error) {
      console.log(error);
      setFeedback({error:true, message:'Error occured resetting image. Retry'});
    }
  }
    
      
  const updateData = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setFeedback({error:false, message:''});
    try {
      setIsLoading(true);
      const data = {
        name:name || state.user?.name,
        department:department || state.user?.department,
        role:role || state.user?.role,
        title:title || state.user?.title,
        lcd:dateTime || state.user?.lcd,
        gender:gender || state.user?.gender,
        photo:state.user?.photo,
      }
      const res = await axios.put(`${API}users/${state.user?._id}`, data);
      dispatch({type:'LOGIN_SUCCESS', payload:res.data});
      setFeedback({error:false, message:'Data updated successfully'});
    } catch (error) {
      setFeedback({error:true, message:'Error occured updating your data'});
    }finally{
      setIsLoading(false);
    }
  }

  // console.log(new Date(state?.user?.lcd).toISOString().slice(0, 16));
  const getLCDDate = ()=>{
    let date;
    if(state.user?.lcd){
      date = state.user?.lcd.toISOString().slice(0, 16)
    }else{
      date = new Date().toISOString().slice(0, 16)
    }
  }
  useEffect(()=>{
    uploadPhoto();
  },[photo])

  return (
    <div className="flex w-full flex-col gap-8 items-center min-h-screen relative" >
      {
        feedback.message &&
        <Alert onClose={()=>setFeedback({error:false, message:''})} severity={feedback.error ? 'error':'success'} className="absolute top-8" >{feedback.message}</Alert>
      }
      <div className="py-4 w-full bg-white shadow-md flex flex-row justify-center">
        <span className='font-semibold w-5/6 text-[1rem] md:text-2xl' >Account Details</span>
      </div>
      <div className="w-[90%] lg:w-5/6 flex flex-col gap-6 items-center">
        <div className="w-full gap-4 p-4 flex flex-row items-center bg-white border border-gray-200 rounded-xl">
          {
            state.user?.photo ?
            <img className="w-12 h-12 rounded-full object-cover" src={state.user.photo} alt="profile" />
            :
          <img className="w-12 h-12 rounded-full object-cover" src={photo?URL.createObjectURL(photo) : profilephoto} alt="profile" />
          }
          
          <div onClick={()=>photoRef.current?.click()} className="px-2 py-1 border cursor-pointer border-[#1578FB] flex rounded-lg flex-row items-center justify-center gap-2">
            <LuUpload color="#1578FB" />
            <span className='text-[#1578FB]' >Upload</span>
            <input onChange={(e)=>e.target.files?.length && setPhoto(e?.target?.files[0])} type="file" hidden ref={photoRef} />
          </div>
          <div onClick={removePhoto} className="px-2 py-1 border cursor-pointer border-slate-200 flex rounded-lg flex-row items-center justify-center gap-2">
            <RiDeleteBin6Line color="grey" />
            <span className='text-slate-500' >Remove</span>
          </div>
        </div>
      </div>

     

      <div className="w-[90%] lg:w-5/6 flex flex-col gap-6 items-center">
        <form onSubmit={updateData} className="w-full gap-8 p-4 flex flex-col lg:grid lg:grid-cols-2 items-center bg-white border border-gray-200 rounded-xl">

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Staff name</span>
            <input defaultValue={state.user?.name} onChange={(e)=>setName(e.target.value)} className="w-full border border-slate-200 p-2 rounded-md outline-none" type="text" placeholder="not set" />
          </div>

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Department</span>
            <select onChange={(e)=>setDepartment(e.target.value)}  className="w-full border border-slate-200 p-2 rounded-md outline-none" title="department"  name="dep" id="dep">
              <option value='' >{state.user?.department || 'Select'}</option>
              <option value='Sales' >Sales</option>
              <option value='Marketing' >Marketing</option>
              <option value='IT' >IT</option>
              <option value='Finance' >Finance</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Role</span>
            <input defaultValue={state.user?.role} onChange={(e)=>setRole(e.target.value)}  className="w-full border border-slate-200 p-2 rounded-md outline-none" type="text" placeholder="not set" />
          </div>

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Title</span>
            <input defaultValue={state.user?.title} onChange={(e)=>setTitle(e.target.value)}  className="w-full border border-slate-200 p-2 rounded-md outline-none" type="text" placeholder="not set" />
          </div>
         

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Gender</span>
            <div className="flex gap-8 items-center">
              <div className="flex flex-row gap-4 items-center">
                <span>Male</span>
                <input className="cursor-pointer" onChange={(e)=>setGender(e.target.value)} checked ={(state.user?.gender === 'Male') || (gender==='Male')} type="radio" name="gender" title="Male" id="male" value='Male' />
              </div>
              <div className="flex flex-row gap-4 items-center">
                <span>Female</span>
                 <input checked ={(state?.user?.gender === 'Female') || (gender==='Female')} className="cursor-pointer" onChange={(e)=>setGender(e.target.value)} type="radio" name="gender" title="Female" id="female" value='Female' />
              </div>
                
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full lg:w2/3">
            <span className="text-black text-[0.9rem] md:text-[1rem] font-semibold">Last Certificate Date</span>
            <input  value={dateTime} onChange={handleDateTimeChange} className="w-full border border-slate-200 p-2 rounded-md outline-none" type='datetime-local'  placeholder="not set" />
          </div>

          <div className="flex w-full lg:w-[200%] items-center justify-between">
            {
              hasMadeChanges &&
              <button disabled={isLoading} className={`${isLoading? 'bg-blue-200':'bg-[#1578FB]'} px-2 py-1 text-white text-[1rem] rounded-lg hover:bg-blue-500 border-none`} type="submit" >{isLoading ? 'Loading...':'Save Changes'}</button>
            }
            <div className="flex flex-row items-center gap-4">
              <button type='button' className="bg-red-600 px-2 py-1 text-white text-[1rem] rounded-lg hover:bg-red-400 border-none"  onClick={logout}> Logout</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile