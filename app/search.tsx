'use client'

import Link from 'next/link';
import { ChangeEvent, useState, useEffect } from 'react';
import { Movie } from './types/app';
import Image from 'next/image';

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
        <div className='bg-white rounded-md w-1/2 max-w-md p-6' style={{minWidth: '300px'}}>
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
            <div className='listArea rounded-md w-1/2 max-w-md' style={{minWidth: '300px'}}>
                <ul className="bg-white overflow-y-auto max-h-60 rounded-md">
                    {filteredMovies?.map((movie) => (
                        <Link key={movie.id} href={`/${movie.id}`}>
                            <li className='text-black border-gray-300 border-2 p-4 rounded-md flex flex-row items-center space-x-4'
                                key={movie.id}>
                                <Image src={movie.poster} width={40} height={50} alt='thumbnail' />
                                <p className='font-normal text-md'>{movie.title}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Search;