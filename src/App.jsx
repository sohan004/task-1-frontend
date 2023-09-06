import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { FaBell, FaListUl } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './components/AuthProvider/AuthProvider'
import moment from 'moment/moment'


function App() {
  const [count, setCount] = useState(0)

  const { user, out, noti, notiLoad, setNotiLoad } = useContext(AuthContext)
  const unRead = noti.filter(n => n.read === false)
  const unreadCall = () => {
    if (unRead.length === 0) {
      return
    }
    const unreadID = unRead.map(n => n._id)
    fetch(`http://localhost:5000/notification`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({ id: unreadID })
    })
      .then(res => res.json())
      .then(data => {
        setNotiLoad(notiLoad + 1)
      })
  }
  const commonLink = <>
    <Link to='/add' className='p-1 border rounded '>Add Contact</Link>
    <Link to='/all' className='p-1 border rounded '>All Contact</Link>
    <Link to='/group' className='p-1 border rounded '>Group Contact</Link>
    {user && <Link to='/permission-request' className='p-1 border rounded '>permission request</Link>}
    {user && <Link to='/my-contact' className='p-1 border rounded '>My Contact</Link>}
    {user && <div className="dropdown dropdown-end">
      <p onClick={unreadCall} tabIndex={0} className='p-1 text-2xl opacity-80 cursor-pointer relative'><FaBell></FaBell>{unRead.length > 0 && <span className=' text-xs w-4 h-4 flex justify-center items-center top-0 right-0 text-white rounded-full absolute bg-red-500'>{unRead.length}</span>}</p>
      <div tabIndex={0} className="dropdown-content  z-[1] menu p-2 shadow overflow-y-auto rounded-box w-64  bg-blue-300">
        <div className='h-[250px] overflow-y-auto'>
          {
            noti.map(n => <Link to={n.path} key={n._id} className=' pb-2 bg-blue-200  p-1 cursor-pointer mb-2 flex w-full flex-row justify-between items-center'><span>{n.message}</span> <span className='text-[10px]'>{moment(n.created_at).format("MMM Do YY")}</span></Link>)
          }
        </div>
      </div>
    </div>}
  </>

  return (
    <div className='max-w-[1440px] mx-auto px-4'>
      <nav className='p-3 border-b-2 flex justify-between items-center '>
        <h1 className='text-2xl font-bold'>Task 1</h1>

        <div className='hidden  lg:flex gap-7 items-center  font-medium'>
          {commonLink}
        </div>

        {!user ? <div className='hidden lg:flex'>
          <Link to='/login'><button className="btn btn-primary">Log in</button></Link>
        </div > : <div onClick={() => out()} className='hidden lg:flex'>
          < ><button className="btn btn-error">Logout</button></>
        </div>}

        <div className="dropdown dropdown-end">
          <FaListUl tabIndex={0} className='text-lg lg:hidden cursor-pointer'></FaListUl>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 flex flex-col gap-3 shadow-xl bg-base-100 rounded-box w-52">
            {commonLink}
            {!user ? <div className='flex'>
              <Link to='/login'><button className="btn btn-primary mt-4">Log in</button></Link>
            </div > : <div onClick={() => out()} className='flex'>
              < ><button className="btn btn-error mt-4">Logout</button></>
            </div>}
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
