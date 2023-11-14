import Image from 'next/image';
import Search from './search';
import { Movie } from './types/app';
import Banner from './components/banner-main.png'

const getMovies = async () => {
  const res = await fetch('http://localhost:4000/movies');
  return res.json();
}

const Home = async () => {
  const movies: Movie[] = await getMovies();
  return (
    <div className="h-screen flex flex-col items-center justify-center relative bottom-20">
      <Image alt="main-banner" src={Banner} className="absolute top-20 z-0 w-full max-h-60 object-cover mask-image-gradient"/>
      <p className="my-1 text-white z-10">Search your favourite MCU movies</p>
      <Search movieList={movies} />
    </div>
  );
};

export default Home;
