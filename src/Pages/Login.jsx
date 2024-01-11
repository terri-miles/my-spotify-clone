import React from 'react'

function Login() {

    const HandleClick = () =>{
        const clientId = '501d2d3679284c10a0658a8ee138c32d';
        const redirectedUrl = 'http://localhost:3000/';
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const scope = [
            'user-read-email',
            'user-read-private','user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing', 
            'user-read-playback-position',
            'user-read-recently-played',
            'user-top-read'
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectedUrl}&scope=${scope.join(" ")}&response_type=token&show_dialogue=true`;
    };
  return (
    <div className='flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-[#1db954] gap-10'>
        <img className='h-[20vh]' src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt='spotify-logo'/>
        <button onClick={HandleClick} className='py-3 px-14 rounded-[40px] bg-black text-[#49f585] text-[18] border-none font-[600] cursor-pointer'>Connect Spotify</button>
    </div>
  )
}

export default Login