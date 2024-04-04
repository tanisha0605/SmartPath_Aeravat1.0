'use client';
import React, { useState } from 'react';
import useTheme from '@/Context/theme';
import Link from 'next/link';
import { DarkModeIcon } from '@/components/icons/DarkModeIcon';
import { LightModeIcon } from '@/components/icons/LightModeIcon';
import { usePathname } from 'next/navigation';

function Navbar() {
    const { themeMode, toggleTheme } = useTheme();
    const pathname = usePathname();
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Create', href: '/create' },
        { label: 'Community', href: '/community' }
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full h-fit flex flex-row justify-between px-8 py-4 z-50 select-none bg-inherit ${themeMode}`}
            >
                <div>
                    <Link
                        href="/"
                        className="text-3xl font-semibold bg-gradient-to-r bg-clip-text from-blue-500 to-blue-400 text-transparent"
                    >
                        SmartPath
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:gap-2">
                    <ul className="md:flex flex-row gap-3 text-xl items-center">
                        {items.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className={` text-lg rounded-full p-4 hover:border hover:border-blue-400 ${
                                            isActive
                                                ? 'bg-blue-400 hover:text-inherit'
                                                : ''
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div>
                        <div className="flex">
                            <button className="flex justify-center items-center w-10 h-10 text-3xl rounded-xl transition-all hover:border-black hover:border dark:hover:border-white">
                                {themeMode === 'light' ? (
                                    <DarkModeIcon onClick={toggleTheme} />
                                ) : (
                                    <LightModeIcon onClick={toggleTheme} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
