import { Movie } from '../types/app';
import { notFound } from 'next/navigation';
import MovieDetails from './MovieDetails';
import Controls from './Controls';
import Image from 'next/image';
import { db } from '../firebase';
import { ref, onValue, get, goOffline } from 'firebase/database';

// export const dynamicParams = false;

// export async function generateStaticParams() {
//     const res = await fetch('http://localhost:4000/movies');
//     const movies = await res.json();

//     return movies.map((movie: Movie) => ({
//         id: movie.id.toString()
//     }));
// }

const getMovies = async () => {
    const res = await fetch('http://localhost:4000/movies');
    const movies = await res.json();
    return movies;
    // if (typeof window !== 'undefined' && window.localStorage) {
    //     const res = localStorage.getItem('movies');
    //     if(typeof res === 'string') return JSON.parse(res);
    // }
    // else {
    //     const movieRef = ref(db, 'movies/');
    //     try {
    //         const snapshot = await get(movieRef);
    //         if (snapshot.exists()) {
    //             const data = snapshot.val();
    //             return data;
    //         } else {
    //             console.log('No data available');
    //             return null;
    //         }
    //     }
    //     catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
        // if (!res.ok) {
        //     notFound(); // returns 404 page
        // }
        // console.log(typeof res);
    // }
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
    const validPrequelMovies:Movie[] = prequelMovies?.filter((movie)=>movie!==null) as Movie[];

    return (
        <div className="w-full h-full">
            <MovieDetails
                movies={validPrequelMovies}
            />
            {/* <Controls /> */}
        </div>
    )
}

export default MoviePage;