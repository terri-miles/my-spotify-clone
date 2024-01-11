import React from 'react'
import Spotify from './Spotify'
import Login from './Login'
import { useStateProvider } from '../Utils/StateProvider'

function Home() {
    const [{token}] = useStateProvider()
  return (
    <>
        { token ? <Spotify /> : <Login /> }
    </>
  )
}

export default Home