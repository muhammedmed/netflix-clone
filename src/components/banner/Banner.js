import React,{useState, useEffect} from 'react'
import './banner.scss'
import axios from '../../axios'
import requests from '../../Request'
const Banner = () => {
   const[movie, setMovie] = useState([]);

   useEffect(() =>{
     async function fetchData(){
       const request = await axios.get(requests.fetchNetflixOriginals);
       setMovie(request.data.results[
         Math.floor(Math.random()* request.data.results.length)
       ])
       return request; 
     }
     fetchData();
   },[])

   let firstDate = new Date(movie?.first_air_date);
 
   function truncate(string, n){
    return string?.length > n ? string.substr(0, n-1) + "..." : string;
  }

  return (
    <div className="banner" 
    style={{
      backgroundSize:"cover",
      backgroundPosition:"center center",
      backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}>
       
       <div className="banner--vertical">
         <div className="banner--horizontal">
           <div className="name">{movie?.title || movie?.name || movie?.original_name }</div>
           <div className="info">
             <div className="points">{movie?.vote_average} points</div>
             <div className="year">{firstDate.getFullYear()}</div>    
           </div>
           <div className="description">{truncate(movie?.overview, 130)}</div>
           <div className="buttons">
             <a href={`watch/${movie?.id}`}>▶ Play</a>
             <a href={`watch/${movie?.id}`}>+ My List</a>
           </div>
         </div>
       </div>
       

    </div>
  )
}

export default Banner