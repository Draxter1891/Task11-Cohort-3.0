import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-black'>
      {/* <Home/> */}
      {/* <h1 className='text-white'>Radhe Radhe</h1> */}
      {/* <Login/> */}
      <Signup/>
    </div>
  )
}

export default App