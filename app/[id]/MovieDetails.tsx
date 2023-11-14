import Image from "next/image";
import { Movie } from "../types/app";
import Banner from '../components/banner-main.png'

const MovieDetails = ({ movie }: { movie: Movie }) => {
    return (
        <div className="w-1/2 text-white">
            <div className={`relative ${movie ? 'bg-cover bg-center' : 'bg-black'
                } text-white p-8 rounded-md`}
                style={
                    movie
                        ? { backgroundImage: `url('../components/banner-main.png')` }
                        : {}
                }>
                {movie ? (
                    <div>
                        <h2>{movie.title}</h2>
                        {/* Add more movie details as needed */}
                    </div>
                ) : (
                    <p>Select a movie from the timeline</p>
                )}
            </div>
        </div>
    )
}

export default MovieDetails; 