import { useEffect } from "react";
import { useStateProvider } from "./Utils/StateProvider";
import { reducerCases } from "./Utils/reducer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";



function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() =>{
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split('&')[0].split('=')[1];
      dispatch({type: reducerCases.SET_TOKEN, token })
    }
  },[token, dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
