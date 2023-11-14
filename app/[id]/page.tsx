import { Movie } from '../types/app';
import { notFound } from 'next/navigation';
import MovieDetails from './MovieDetails';
import MovieTimeline from './MovieTimeline';

export const dynamicParams=true;  

export async function generateStaticParams(){
    const res=await fetch('http://localhost:4000/movies');
    const movies=await res.json();

    return movies.map((movie:Movie)=>({
        id:movie.id.toString()
    }));
}

const getMovieDetails = async (id: number) => {
    const res = await fetch(`http://localhost:4000/movies/${id}`);
    if(!res.ok){
        notFound(); // returns 404 page
    }
    // console.log(res.json());
    return res.json();
}

const MoviePage = async ({ params }) => {
    const movie = await getMovieDetails(params.id);
    // console.log(movie);
    return (
        <div className="flex flex-row w-full">
            {/* <p className="text-center text-white">{movie.title}</p> */}
            <MovieTimeline movies={movie.prequels}/>
            <MovieDetails movie={movie} />
        </div>
    )
}

export default MoviePage;