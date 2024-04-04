'use client';
import React, { useState } from 'react';
import Hero from '@/components/components/Hero';

export default function Home() {
    return (
        <main
            className={`relative h-screen flex flex-col items-center justify-between`}
        >
            <Hero />
        </main>
    );
}
