'use client'

import Link from 'next/link';
import { ChangeEvent, useState, useEffect } from 'react';
import { Movie } from './types/app';

const Search = ({ movieList }: { movieList: Movie[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    const onSearch = (searchTerm: string) => {
        if (searchTerm?.length === 0) {
            setFilteredMovies([]);
            return;
        }

        const filtered = movieList?.filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm?.toLowerCase())
        );

        setFilteredMovies(filtered);
    }

    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm]);

    return (
        <div className='bg-white rounded-md w-1/2 max-w-md p-6'>
            <div className='searchArea'>
                <label>
                    <p>Search</p>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-black border-black border-2 p-2 rounded-md w-full"
                        type="text"
                    />
                </label>
            </div>
            <div className='listArea rounded-md w-1/2 max-w-md'>
                <ul className="bg-white overflow-y-auto max-h-60 rounded-md">
                    {filteredMovies?.map((movie) => (
                        <Link href={`/${movie.id}`}>
                            <li className='text-black border-gray-300 border-2 p-4 rounded-md my-2'
                                key={movie.id}>
                                {movie.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Search;