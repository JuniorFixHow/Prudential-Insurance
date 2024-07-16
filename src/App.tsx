import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

  return (
  //  <Login/>
  <div className="w-full bg-[#F6F6F6]">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>

  </div>
  )
}

export default App
