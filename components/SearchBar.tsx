// FIX: Import React and hooks to resolve undefined errors.
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from './icons/SearchIcon';
import LocationIcon from './icons/LocationIcon';

type FormEvent = React.FormEvent;

interface SearchBarProps {
    onSearch: (location: string) => void;
    location: string;
    setLocation: (location: string) => void;
    isLoading: boolean;
}

// Mock suggestions - in a real app, this would come from a geocoding API
const MOCK_SUGGESTIONS = [
    "Zagreb, Croatia",
    "Split, Croatia",
    "Rijeka, Croatia",
    "Osijek, Croatia",
    "Belgrade, Serbia",
    "Ljubljana, Slovenia",
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
];

// FIX: Corrected component type from custom 'FC' to 'React.FC' to resolve generic type error.
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, location, setLocation, isLoading }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    // FIX: Changed ref type from HTMLDivElement to HTMLFormElement to match the element it's attached to.
    const searchBarRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (location.length > 1) {
            const filtered = MOCK_SUGGESTIONS.filter(s => 
                s.toLowerCase().includes(location.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        onSearch(location);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setLocation(suggestion);
        setShowSuggestions(false);
        onSearch(suggestion);
    };
    
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            alert("Geolocation is supported, but for this demo, please type your city name manually.");
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        // FIX: Removed unnecessary cast on ref.
        <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg mx-auto relative" ref={searchBarRef}>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                     <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onFocus={() => setShowSuggestions(location.length > 1)}
                        placeholder="e.g., Zagreb, Croatia"
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow duration-200 placeholder-gray-500"
                        autoComplete="off"
                    />
                    <button 
                        type="button" 
                        onClick={handleGetLocation}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                        title="Use my location"
                        disabled={isLoading}
                    >
                        <LocationIcon />
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SearchIcon />
                    {isLoading ? 'Searching...' : 'Find Vibes'}
                </button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full sm:w-[calc(100%-140px)] mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((s, i) => (
                        <li 
                            key={i}
                            onClick={() => handleSuggestionClick(s)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {s}
                        </li>
                    ))}
                     <li className="px-4 py-1 text-xs text-gray-500 text-center">
                        Location suggestions are for demo purposes.
                    </li>
                </ul>
            )}
        </form>
    );
};

export default SearchBar;