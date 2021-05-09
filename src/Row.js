import React,{useState, useEffect} from 'react'
import YouTube from 'react-youtube'
import axios from "./axios"

import "./row.css"
const base_url = "https://image.tmdb.org/t/p/original/"
const Row = ({title, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("")
    // a snippet of code wich runs on a specific condition or a variable
    // run a piece of code when the row apprears we make a request and pull the information right when the row load
    //everytime the row load the useeffect will run 
    useEffect(() => {
        //run one if [], run once when the row loads and don't run again 
        //run everytime the movies changes
        // the reason why we called fetchUrl as a dependency in the useEffect is that because it's an outsider and
        // we need to tell use effect to refrech the code each time
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    console.table(movies)
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        },
      };
    
    const handleClick= async(movie)=>{
        if (trailerUrl){
            setTrailerUrl('');
        }else{
            let trailerurl = await axios.get(
                `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
              );
              setTrailerUrl(trailerurl.data.results[0]?.key);
            }
    }
    
    return (
        <div className="row">
        { /* title*/ }
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map
                    (movie=>(
                        <img  key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`} alt={movie.name}  onClick={() => handleClick(movie)} />
                    ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        
        </div>
    )
}

export default Row
