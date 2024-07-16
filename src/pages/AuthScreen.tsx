import LoginSingup from "../components/Login"

// import IMG from '../'
function AuthScreen() {
  return (
    <div className='w-full self-center overflow-y-hidden justify-center flex-row flex h-screen' >
        <div className="hidden px-16 items-center justify-center flex-col  lg:flex w-1/2 h-full">
            <img className="w-full" src='/imgs/undraw_online_test_re_kyfx.svg' alt="welcome logo" />
            <div className="flex mt-8 flex-col">
                <span className='font-semibold text-2xl' >Welcome back to Prudential!</span>
                <span className="text-[0.8rem] text-gray-400" >Sign in and manage your employee data</span>
            </div>
        </div>
        <LoginSingup />
    </div>
  )
}

export default AuthScreen