import React, { useEffect, useRef, useState } from 'react';
import SideBar from '../Components/SideBar';
import NavBar from '../Components/NavBar';
import Body from '../Components/Body';
import Footer from '../Components/Footer';
import { useStateProvider } from '../Utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../Utils/reducer';

function Spotify() {
  const [{token}, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false)
    bodyRef.current.scrollTop >= 275 ? setHeaderBackground(true) : setHeaderBackground(false)
  }

  useEffect(() =>{
    const getUserInfo = async () =>{
      const { data } = await axios.get('https://api.spotify.com/v1/me ',
      {
          headers:{
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
          }
      })
      const userInfo = {
        userId: data.id,
        userName: data.display_name
      }
      dispatch({type: reducerCases.SET_USER, userInfo});
    }
    getUserInfo()
  },[dispatch,token])
  return (
    <div className='max-w-[100vw] max-h-[100vh] overflow-hidden'>
      <div className='h-[85vh] w-[100vw] flex bg-gradient-to-b from-transparent to-[rgba(0,0,0,1)] bg-[rgba(32,87,100)]'>
        <div className='flex-1 w-[15vw] h-[100%]'>
          <SideBar />
        </div>
        <div className='flex-2 w-[85vw] h-[100%] overflow-auto' ref={bodyRef} onScroll={bodyScrolled}>
          <NavBar navBackground={navBackground}/>
          <div className='body-content'>
            <Body headerBackground={headerBackground}/>
          </div>
        </div>
      </div>
      <div className='h-[15vh] w-[100%]'>
        <Footer />
      </div>
    </div>
  )
}

export default Spotify