import React, { useEffect } from 'react'
import { useStateProvider } from '../Utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../Utils/reducer'

function Body({headerBackground}) {
  const [{token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider()
  useEffect(() => {
    const getInitialPlaylist = async () =>{
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
          headers:{
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
          }
      })
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith('<a') ? '' : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track}) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number
        }))
      }
      dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist})
    }
    getInitialPlaylist()
  },[token, dispatch, selectedPlaylistId])


  const truncateString = (str, num) =>{
    if(str?.length > num){
        return str.slice(0, num) + '...'
    }else{
        return str
    }
}

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) =>{
    await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      {
        context_uri,
        offset: {
          position: track_number - 1
        },
        position_ms: 0
      },
      {
          headers:{
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
          }
      }
  )
  .then((response) => {
    if (response.status === 204){
      const currentlyPlaying = {
        id,
        name,
        artists,
        image
      }
      dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
      dispatch({type: reducerCases.SET_PLAYERSTATE, playerState: true});
    }
    else{
      dispatch({type: reducerCases.SET_PLAYERSTATE, playerState: true});
    }
})
  }
    const msToMinutesAndSeconds = (ms) =>{
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <>
      {selectedPlaylist && (
        <>
          <div className="mx-[2rem] flex items-center gap-[2rem]">
            <div className="image">
              <img src={selectedPlaylist.image} alt="slectedPlaylist-image" className='h-[15rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55)]' />
            </div>
            <div className="flex flex-col gap-[1rem] text-[#e0dede]">
              <span className="type">PLAYLIST</span>
              <h1 className='text-white text-[4rem] font-[600]'>{selectedPlaylist.name}</h1>
              <p>{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <table className="table-auto mx-[2rem] my-[2rem] ">
              <thead className={`text-[#dddcdc] text-left sticky top-[16vh] text-[14px] ${headerBackground ? 'bg-black' : 'none'}`}>
                <tr className={`h-[40px]`}>
                  <th>
                  <span className={`px-[1rem]`}>#</span>
                  </th>
                  <th>
                    <span>TITLE</span>
                  </th>
                  <th>
                    <span>ALBUM</span>
                  </th>
                  <th>
                    <span><i className="ri-time-fill"></i></span>
                  </th>
                </tr>
              </thead>
              <tbody>
              {selectedPlaylist.tracks.map(({id, name, artists, image, duration, album, context_uri, track_number}, index) => {
                  return (
                <tr  key={id}className='hover:bg-[rgba(0,0,0,0.7)] cursor-pointer' onClick={()=> playTrack(id,
                  name,
                  artists,
                  image,
                  context_uri,
                  track_number)} >
                  <td> <span className='font-medium w-[50px] block px-[1rem] mt-2 mb-2 text-[#b3b3b3] text-[16px]'>{index + 1}</span></td>
                  <td>
                    <div className="flex items-center gap-6 mt-2 mb-2">
                      <div className="image">
                        <img src={image} alt="track-image" className='h-[43px] rounded-[6px]' />
                      </div>
                      <div className="flex flex-col w-[500px] truncate">
                        <span className="whitespace-normal text-[16px] text-white font-semibold">{truncateString(name, 50)}</span>
                        <span className='whitespace-normal font-medium text-[#b3b3b3] text-[14px]'>{artists.join(', ')}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className='whitespace-normal w-[300px] block font-medium text-[#b3b3b3] text-[14px] mt-2 mb-2'>{truncateString(album, 30)}</span></td>
                  <td><span className='font-medium text-[#b3b3b3] text-[14px] mt-2 mb-2 pr-[1rem]'>{msToMinutesAndSeconds(duration)}</span></td>
                </tr>
                )
                  
              })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default Body