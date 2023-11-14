import { Movie } from '../types/app';
import { notFound } from 'next/navigation';

export const dynamicParams=true;  

export async function generateStaticParams(){
    const res=await fetch('http://localhost:4000/movies');
    const movies=await res.json();

    return movies.map((movie:Movie)=>({
        id:movie.id
    }));
}

const getMovieDetails = async (id: number) => {
    const res = await fetch(`http://localhost:4000/movies/${id}`);
    if(!res.ok){
        notFound(); // returns 404 page
    }

    return res.json();
}

const MoviePage = async ({ params }) => {
    const movie = await getMovieDetails(params.id);
    return (
        <div>
            <p className="text-center text-white">{movie.title}</p>
        </div>
    )
}

export default MoviePage;