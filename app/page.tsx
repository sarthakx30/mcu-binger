import Image from 'next/image';
import Search from './search';
import { Movie } from './types/app';
import Banner from './components/banner-main.png';
import { db } from './firebase';
import {ref,onValue,getDatabase} from 'firebase/database';

const getMovies = async () => {
  let res:Movie[];
  const movieRef = ref(db, 'movies/');
  onValue(movieRef, (snapshot) => {
    res = snapshot.val();
  });
  return res;
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
