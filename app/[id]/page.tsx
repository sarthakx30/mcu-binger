import { Movie } from '../types/app';
import { notFound } from 'next/navigation';
import MovieDetails from './MovieDetails';
import Controls from './Controls';
import Image from 'next/image';
import { db } from '../firebase';
import { ref, onValue, get } from 'firebase/database';

export const dynamicParams = false;

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/movies');
    const movies = await res.json();

    return movies.map((movie: Movie) => ({
        id: movie.id.toString()
    }));
}

const getMovies = async () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const res = localStorage.getItem('movies');
        return JSON.parse(res);
    }
    else {
        let res: Movie[];
        const movieRef = ref(db, 'movies/');
        onValue(movieRef, (snapshot) => {
            res = snapshot.val();
        });
        // if (!res.ok) {
        //     notFound(); // returns 404 page
        // }
        // console.log(typeof res);
        return res;
    }
}

const MoviePage = async ({ params }) => {
    const movies: Movie[] = await getMovies();
    // console.log(movies);
    const selectedMovieId: number = params.id;
    const selectedMovie = movies?.find(movie => movie.id == selectedMovieId);

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