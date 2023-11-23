import Image from 'next/image';
import Search from './search';
import { Movie } from './types/app';
import TypeWriter from './TypeWriter';
import Banner from './components/banner-main.png';
import { db } from './firebase';
import { ref, onValue, getDatabase, goOffline, get } from 'firebase/database';

const getMovies = async () => {
  // const res = await fetch('http://localhost:4000/movies');
  // const movies = await res.json();
  // return movies;

  const movieRef = ref(db, 'movies/');
  try {
    const snapshot = await get(movieRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
      return null;
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

const Home = async () => {
  const movies: Movie[] = await getMovies();
  if (typeof window !== 'undefined') {
    localStorage.setItem('movies', JSON.stringify(movies))
  }

  const text1 = "MCCU-Binger is a guide to the Marvel Cinematic Universe (MCU).";
  const text2 = "Diive into the vast Marvel Cinematic Universe without the hassle of keeping up with every movie. For those who can't watch all the films and web series before heading to the theaters, our curated collection provides a shortcut to the essential movies that build the storyline. Discover the magic of Marvel at your own pace.";

  return (
    <div className="h-screen flex flex-col items-center justify-center relative bottom-20">
      <Image alt="main-banner" src={Banner} className="absolute top-20 z-0 w-full max-h-60 object-cover mask-image-gradient" />
      <p className="my-1 text-white z-10 text-lg">What are you watching today?</p>
      <Search movieList={movies} />
      <TypeWriter text1={text1} text2={text2} />
    </div>
  );
};

export default Home;
