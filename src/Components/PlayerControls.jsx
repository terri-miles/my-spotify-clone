import React from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../Utils/reducer';

function PlayerControls() {
    const [{token, playerState}, dispatch] = useStateProvider()
    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers:{
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        )
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
        }else dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying: null})
    };
    
    const changeState = async () =>{
        const state = playerState ? 'pause' : 'play';
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
                headers:{
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            }
        )
        dispatch({type: reducerCases.SET_PLAYERSTATE, playerState: !playerState})
    } 

  return (
    <div className='flex justify-center items-center gap-[2rem] w-[40%]'>
        <div className="shauffle">
        <i className="ri-shuffle-line text-[#b3b3b3] transition ease-in-out duration-200 hover:text-white" />
        </div>
        <div className="previous">
        <i className="ri-skip-left-fill text-[#b3b3b3] transition ease-in-out duration-200 hover:text-white text-[2rem]" onClick={() => changeTrack('previous')} />
        </div>
        <div className="state">
            {playerState ? <i onClick={changeState} className="ri-pause-circle-fill text-white transition ease-in-out duration-200 hover:text-white text-[2rem]" /> : <i onClick={changeState} className="ri-play-circle-fill text-white transition ease-in-out duration-200 hover:text-white text-[2rem]" /> }
        </div>
        <div className="next">
        <i className="ri-skip-right-fill text-[#b3b3b3] transition ease-in-out duration-200 hover:text-white text-[2rem]" onClick={() => changeTrack('next')} />
        </div>
        <div className="repeat">
        <i className="ri-repeat-fill text-[#b3b3b3] transition ease-in-out duration-200 hover:text-white" />
        </div>
    </div>
  )
}

export default PlayerControls