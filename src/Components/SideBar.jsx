import React, { useState } from 'react'
import Playlist from './PlayList'
import { Link } from 'react-router-dom'

function SideBar() {
  const [menu, setMenu] = useState('home')
  return (
    <div className='bg-black h-[100%] w-[100%] text-[#b3b3b3] flex flex-col'>
      <div className='flex flex-col'>
        <div className='my-[16px]'>
          <img className='h-[40px] max-w-[240px] mx-auto' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt='spotify-logo'/>
        </div>
        <ul className='flex flex-col gap-[16px] ml-[18px] p-[16px] list-none text-[18px] font-[600]'>
          <li className='flex gap-[16px] cursor-pointer'><i className="ri-home-3-fill text-white"></i>
            <span className='text-white'>Home</span>
          </li>
          <Link to='/search'><li className='flex gap-[16px] cursor-pointer transition ease-in-out duration-300 hover:text-white'><i className="ri-search-line" />
            <span>Search</span>
          </li></Link>
          <li className='flex gap-[16px] cursor-pointer transition ease-in-out duration-300 hover:text-white mt-[18px]'><i className="ri-play-list-line" />
            <span>Your Library</span>
          </li>
        </ul>
        <Playlist />
      </div>
      
    </div>
  )
}

export default SideBar