import React from 'react'
import { useStateProvider } from '../Utils/StateProvider'

function NavBar({navBackground}) {
  const [{userInfo}] = useStateProvider()
  return (
    <div className={`flex justify-between items-center h-[15vh] px-[2rem] py-[4.2rem] sticky top-0 ${navBackground ? 'bg-[rgba(0,0,0,0.7)]' : 'none'} transition ease-in-out duration-300`}>
      <div className='flex items-center gap-[0.5rem] bg-white w-[40%] py-[0.6rem] px-[1.3rem] rounded-[2rem]'>
        <i className="ri-search-line" />
        <input type="text" placeholder='Artist, Songs, or Podcasts' className='border-none outline-none w-full h-[1.5rem]'/>
      </div>
      <div className="flex justify-center items-center bg-black py-[0.3rem] px-[1.2rem] rounded-[2rem]">
        <a href="#" className='flex justify-center items-center gap-[0.5rem] no-underline text-white font-[600]'>
          <i className="ri-user-3-line text-[1rem] bg-[#282828] text-[#c7c5c5] py-[0.3rem] px-[0.5rem] rounded-[1rem]" />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  )
}

export default NavBar