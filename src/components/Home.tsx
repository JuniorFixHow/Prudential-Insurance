import { useState } from 'react'
import Searchbar from '../utils/Searchbar'
import {UsersTable} from '../utils/UsersTable'
import { UserProps } from '../types/Types'
import Card from '../utils/Card'

const Home = () => {
    const [currentData, setCurrentData] = useState<UserProps | null>(null);
    const [search, setSearch] = useState<string>('');
  return (
    <div className='w-full lg:grow flex flex-col gap-4' >
        <Searchbar setSearch={setSearch} />
        <UsersTable search={search} setCurrentData={setCurrentData} />
        <Card currentData={currentData} setCurrentData={setCurrentData} />
    </div>
  )
}

export default Home