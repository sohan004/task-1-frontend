import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { FaListUl } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  const commonLink = <>
    <Link to='/add' className='p-1 border rounded bg-slate-200'>Add New Contact</Link>
    <Link to='/all' className='p-1 border rounded bg-slate-200'>Show All Contact</Link>
    <Link to='/group' className='p-1 border rounded bg-slate-200'>Group Contact</Link>
  </>

  return (
    <div className='max-w-[1440px] mx-auto px-4'>
      <nav className='p-3 border-b-2 flex justify-between items-center '>
        <h1 className='text-2xl font-bold'>Task 1</h1>

        <div className='hidden  lg:flex gap-7 items-center flex-grow  justify-center font-medium'>
          {commonLink}
        </div>

        <div className="dropdown dropdown-end">
          <FaListUl tabIndex={0} className='text-lg lg:hidden cursor-pointer'></FaListUl>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 flex flex-col gap-3 shadow-xl bg-base-100 rounded-box w-52">
            {commonLink}
          </ul>
        </div>
      </nav>

      <Outlet></Outlet>
      <ToastContainer
      ></ToastContainer>
    </div>
  )
}

export default App
