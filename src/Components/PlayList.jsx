import React, { useEffect } from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../Utils/reducer';

function Playlist() {
    const [{token, playlist}, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () =>{
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
                {
                    headers:{
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    }
                }
            )
            const {items} = response.data;
            const playlist = items.map(({name, id}) => {return {name, id}})
            dispatch({type: reducerCases.SET_PLAYLISTS, playlist})
        }
        getPlaylistData();
    },[token,dispatch])

    const changeCurrentPlaylistId = (playlistId) =>{
        dispatch({type: reducerCases.SET_PLAYLIST_ID, playlistId});
    }
  return (
    <div className='ml-[18px]'>
        <p className='ml-[18px] text-[14px] bg-slate-800 w-[70px] text-center font-[600] text-white p-[5px] rounded-[50px]'>Playlist</p>
        <ul className='flex flex-col p-[16px] list-none text-[18px] font-[600] gap-2 overflow-auto'>
            {playlist.map(({name, id}) => {
                return (
                    <li key={id} data-id={id} onClick={() => changeCurrentPlaylistId(id)} className='cursor-pointer transition ease-in-out duration-300 hover:text-white truncate'>{name}</li>
                )
            })}
        </ul>
    </div>
  )
}

export default Playlist