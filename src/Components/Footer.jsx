import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume'

function Footer() {
  return (
    <div className='bg-[#181818] h-[100%] w-[100%] border-t border-[#282828] flex justify-between items-center px-[1rem]'>
      <CurrentTrack />
      <PlayerControls />
      <Volume />
      </div>
  )
}

export default Footer