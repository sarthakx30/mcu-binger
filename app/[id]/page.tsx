import { Movie } from '../types/app';
import { notFound } from 'next/navigation';
import MovieDetails from './MovieDetails';
import Controls from './Controls';
import Image from 'next/image';
// import img from '/images/iron-man-1/poster.jpg';

export const dynamicParams = true;

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/movies');
    const movies = await res.json();

    return movies.map((movie: Movie) => ({
        id: movie.id.toString()
    }));
}

const getMovies = async () => {
    const res = await fetch('http://localhost:4000/movies');
    if (!res.ok) {
        notFound(); // returns 404 page
    }
    // console.log(res.json());
    return res.json();
}

const MoviePage = async ({ params }) => {
    const movies: Movie[] = await getMovies();
    const selectedMovieId: number = params.id;
    const selectedMovie = movies.find(movie => movie.id == selectedMovieId);

    function getPrequelMovies() {
        const prequelsTitles = selectedMovie?.prequels.map(prequelId => {
            const prequelMovie = movies.find(movie => movie.id == prequelId);
            return prequelMovie ? prequelMovie : null;
        });

        return prequelsTitles?.filter(title => title !== null);
    }

    const prequelMovies = getPrequelMovies();

    return (
        <div className="w-full h-full">
            <MovieDetails
                movies={prequelMovies}
            />
            {/* <Controls /> */}
        </div>
    )
}

export default MoviePage;