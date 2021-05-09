import React,{useState, useEffect} from 'react'
import axios from "./axios"
import request from "./request";
import "./Banner.css"
const Banner = () => {
    const[movie, setMovie]= useState([])
    //run once when the banner component loads
    useEffect(() => {
        async function fetchData(){
            const requests = await axios.get(request.fetchNetflixOriginals)
            setMovie(requests.data.results[Math.floor(Math.random()*requests.data.results.length-1)]);
            return requests;
        }
        
        fetchData()
    }, [])
    console.log(movie)
    function truncate(str, n){
        return str?.length> n ? str.substr(0,n-1) + "...": str;
    }
    return (
        <header className="banner" style={{backgroundSize:"cover", backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition:"center center"}}>

            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name|| movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="bunner__button">Play</button>
                    <button className="bunner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadebottom"></div>
        </header>
    )
}

export default Banner
