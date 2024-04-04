import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { BackgroundBeams } from '../ui/background-beams';

function Hero() {
    const things = [
        'Create Roadmaps',
        'Explore new technologies',
        'Plan your journey',
    ];

    const [currentThingIndex, setCurrentThingIndex] = useState(0);

    // Add use callback for efficienncy at end
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentThingIndex(
                (prevIndex) => (prevIndex + 1) % things.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="h-full w-full flex justify-center items-center m-0 ">
                <div className="w-full text-center">
                    <h1 className="text-semibold text-5xl mb-2">
                        SmartRoad to Sucess
                    </h1>
                    <span className="fade-in-out w-max relative">
                        {things.map((thing, index) => (
                            <span
                                key={index}
                                className={`transition-all duration-300 w-max h-fit !leading-[3rem] -mt-7 sm:-mt-5 md:-mt-4 lg:-mt-2 text-lg sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r bg-clip-text from-blue-500 to-blue-300 text-transparent absolute left-1/2 transform -translate-x-1/2 ${
                                    index === currentThingIndex
                                        ? 'opacity-100'
                                        : 'opacity-0 pointer-events-none'
                                }`}
                                style={{
                                    zIndex: index === currentThingIndex ? 1 : 0,
                                }}
                            >
                                {thing}
                            </span>
                        ))}
                    </span>
                </div>
                <BackgroundBeams />
            </div>
        </>
    );
}

export default Hero;
