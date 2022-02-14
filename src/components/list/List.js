import React,{useState, useEffect} from 'react'
import './list.scss'
import axios from '../../axios'
import Carousel from 'react-elastic-carousel';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'

const base_url="https://image.tmdb.org/t/p/original/"

const List = ({title, fetchUrl,}) => {
  const[movies,setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() =>{
     async function fetchData(){
       const request = await axios.get(fetchUrl);
       setMovies(request.data.results)
     }
     fetchData();
  },[fetchUrl])

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
    autoplay: 0,
    },
};

const handleClick = (movie) => {
    if (trailerUrl) {
        setTrailerUrl('');
    }
    else {
        movieTrailer(movie?.name || movie?.title || movie?.original_name)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));

            }).catch((error) => console.log(error));
    }
}


  const breakPoints=[
    {width:200, itemsToShow:1, itemsToScroll:1,},
    {width:500, itemsToShow:2, itemsToScroll:2,},
    {width:768, itemsToShow:3, itemsToScroll:2,},
    {width:1200, itemsToShow:4, itemsToScroll:2},
    {width:1380, itemsToShow:5, itemsToScroll:2},
    {width:1500, itemsToShow:7, itemsToScroll:3 },
    
  ]

  return (
    <div className="list">
      <h2>{title}</h2>
<div className="list__posters">
      <Carousel breakPoints={breakPoints} easing="cubic-bezier(.25,.57,0,.25)"
  tiltEasing="cubic-bezier(1,.13,0,.9)"
  transitionMs={800} >
      {movies.map(movie=>{
        return(
        <img className="list__poster"  key={movie.id} onClick={() => handleClick(movie)} src={`${base_url}${movie.poster_path}`} alt={movie.name} />  
        )})}
        </Carousel>
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default List