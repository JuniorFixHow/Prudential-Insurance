import { Route, Routes } from "react-router-dom";
import AuthScreen from "./pages/AuthScreen";
import Profile from "./pages/Profile";


function App() {

  return (
    <div className="w-full flex justify-center items-start bg-[#F6F7F9]" >
      <Routes>
        <Route path="auth" element={<AuthScreen />} />
        <Route path="/" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
