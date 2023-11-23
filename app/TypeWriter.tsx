'use client'

import { useState, useEffect } from 'react';

export default function TypeWriter({ text1, text2 }) {
    const [displayText1, setDisplayText1] = useState('');
    const [displayText2, setDisplayText2] = useState('');

    useEffect(() => {
        let index1 = 0;

        const intervalId1 = setInterval(() => {
            setDisplayText1((prevText) => prevText + text1.charAt(index1));
            index1++;

            if (index1 === text1.length) {
                clearInterval(intervalId1);
                let index2 = 0;
                const intervalId2 = setInterval(() => {
                    setDisplayText2((prevText) => prevText + text2.charAt(index2));
                    index2++;

                    if (index2 === text2.length) {
                        clearInterval(intervalId2);
                    }
                }, 20)
            }
        }, 40); // Adjust the interval as needed


        return () => clearInterval(intervalId1);
    }, [text1, text2]);

    return (
        <div className='text-white fixed bottom-20 p-5 z-0 max-w-3xl'>
            <p>{displayText1}</p>
            <br />
            <p>{displayText2}</p>
        </div>
    )
}