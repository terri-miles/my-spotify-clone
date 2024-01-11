import React, { useEffect } from 'react'
import { useStateProvider } from '../Utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../Utils/reducer';

function CurrentTrack() {
    const [{token, currentlyPlaying}, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () =>{
            const response = await axios.get(
                'https://api.spotify.com/v1/me/player/currently-playing',
                {
                    headers:{
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                }
            )
            if(response.data !== ''){
                const {item} = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url
                }
                dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
            } 
        }
        
        getCurrentTrack();
    },[token,dispatch])

    const truncateString = (str, num) =>{
        if(str?.length > num){
            return str.slice(0, num) + '...'
        }else{
            return str
        }
    }

  return (
    <>
        {
            currentlyPlaying && (
                <div className='flex items-center gap-[1rem] w-[30%]'>
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="current-track-image" className='h-[50px] rounded-[6px]' />
                    </div>
                    <div className="flex flex-col gap-[0.2rem]">
                        <h4 className='text-white'>{truncateString(currentlyPlaying.name, 30)}</h4>
                        <h6 className='text-[#b3b3b3] text-[14px]'>{truncateString(currentlyPlaying.artists.join(', '), 38)}</h6>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default CurrentTrack