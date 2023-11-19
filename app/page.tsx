import Image from 'next/image';
import Search from './search';
import { Movie } from './types/app';
import Banner from './components/banner-main.png';
import { db } from './firebase';
import { ref, onValue, getDatabase, goOffline,get } from 'firebase/database';

const getMovies = async () => {
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
  return (
    <div className="h-screen flex flex-col items-center justify-center relative bottom-20">
      <Image alt="main-banner" src={Banner} className="absolute top-20 z-0 w-full max-h-60 object-cover mask-image-gradient" />
      <p className="my-1 text-white z-10 text-lg">Search your favourite MCU movies</p>
      <Search movieList={movies} />
    </div>
  );
};

export default Home;
