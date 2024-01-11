import React from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import axios from 'axios'

function Volume() {
    const [{token}] = useStateProvider()
    const setVolume = async (e) =>{
        await axios.put(
            'https://api.spotify.com/v1/me/player/volume',
            {},
            {   params:{
                volume_percent: parseInt(e.target.value)
                },
                headers:{
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        )
    }
  return (
    <div className='flex justify-end items-center gap-[10px] w-[30%]'>
        <i className="ri-volume-down-fill text-[#b3b3b3] text-[14px] bg-[#212121] py-[3px] px-[6px] rounded-full" />
        <input type="range" className='w-[12rem] h-[0.5rem] rounded-[2rem]' min={0} max={100} onMouseUp={(e) => setVolume(e)} />
        <i className="ri-volume-up-fill text-[#b3b3b3] text-[14px] bg-[#212121] py-[3px] px-[6px] rounded-full" />
    </div>
  )
}

export default Volume