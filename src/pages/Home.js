import React,{useState, useEffect} from 'react'
import Header from '../components/header/Header'
import Banner from '../components/banner/Banner'
import List from '../components/list/List'
import requests from '../Request'
import ClipLoader from "react-spinners/ClipLoader";
import './home.scss'
function Home() {
 const [loading,setLoading] = useState(false)

 useEffect(() =>{
   setLoading(true)
   setTimeout(() =>{
    setLoading(false)
   },2500)
 },[])


  return (
    <div className="home">
      {
        loading ? 
       <div className="full">
       <ClipLoader
       size={50}
       color={"#FF0000"}
       loading={loading} />
       <h1>Loading...</h1>
       </div>

        :
        <header>
        <Header/>
        <Banner/>
            <List title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
            <List title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <List title="Trending" fetchUrl={requests.fetchTrending} />
            <List title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <List title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <List title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            </header>

      }
   
    </div>
  )
}

export default Home