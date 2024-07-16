import Sidebar from '../components/Sidebar'
import Home from '../components/Home'

const Dashboard = () => {
  return (
    <div className='w-full flex flex-col lg:flex-row items-start min-h-screen' >
        <Sidebar />
        <Home />
    </div>
  )
}

export default Dashboard