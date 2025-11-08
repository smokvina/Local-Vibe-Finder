
import React, { useState, useMemo } from 'react';
import type { Event } from './types';
import { Category } from './types';
import { findLocalVibes } from './services/geminiService';
import SearchBar from './components/SearchBar';
import CategoryCarousel from './components/CategoryCarousel';
import Loader from './components/Loader';
import { CATEGORY_MAP } from './constants';

const App: React.FC = () => {
    const [location, setLocation] = useState<string>('');
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const handleSearch = async (searchLocation: string) => {
        if (!searchLocation.trim()) {
            setError('Please enter a city name.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setEvents([]);
        setHasSearched(true);

        try {
            const fetchedEvents = await findLocalVibes(searchLocation);
            setEvents(fetchedEvents);
            if (fetchedEvents.length === 0) {
                setError("Sorry, I couldn't find any events for that city. Try another one!");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const categorizedEvents = useMemo(() => {
        return events.reduce((acc, event) => {
            const category = event.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(event);
            return acc;
        }, {} as Record<Category, Event[]>);
    }, [events]);
    
    const orderedCategories = Object.values(Category).filter(cat => categorizedEvents[cat]?.length > 0);

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
            <header className="py-6 px-4 sm:px-8 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Local Vibe Finder
                    </h1>
                    <p className="text-center text-gray-400 mt-2">Discover the pulse of your city, powered by Gemini AI</p>
                    <SearchBar 
                        onSearch={handleSearch}
                        location={location}
                        setLocation={setLocation}
                        isLoading={isLoading}
                    />
                </div>
            </header>

            <main className="flex-grow py-8 px-4 sm:px-8">
                <div className="max-w-5xl mx-auto">
                    {isLoading && <Loader />}
                    
                    {!isLoading && error && (
                         <div className="text-center py-10 px-4 bg-gray-800 rounded-lg">
                            <p className="text-red-400">{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && !hasSearched && (
                        <div className="text-center py-20 px-4 bg-gray-800 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-2">Ready to find your vibe?</h2>
                            <p className="text-gray-400">Enter a city above to get started.</p>
                        </div>
                    )}
                    
                    {!isLoading && !error && events.length > 0 && (
                        <div className="space-y-12">
                            {orderedCategories.map(categoryKey => (
                                <CategoryCarousel 
                                    key={categoryKey}
                                    title={CATEGORY_MAP[categoryKey].title}
                                    events={categorizedEvents[categoryKey]}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <footer className="text-center py-4 text-gray-500 text-sm">
                <p>Powered by Google Gemini 2.5 Pro</p>
            </footer>
        </div>
    );
};

export default App;
