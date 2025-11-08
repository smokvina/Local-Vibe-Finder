
import React from 'react';
import SearchIcon from './icons/SearchIcon';
import LocationIcon from './icons/LocationIcon';

interface SearchBarProps {
    onSearch: (location: string) => void;
    location: string;
    setLocation: (location: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, location, setLocation, isLoading }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(location);
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            alert("Geolocation is supported, but for this demo, please type your city name manually.");
            // In a full app, you would use navigator.geolocation.getCurrentPosition
            // and a reverse geocoding service to get the city name.
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 w-full max-w-lg mx-auto">
            <div className="relative flex-grow">
                 <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Zagreb, Croatia"
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow duration-200 placeholder-gray-500"
                />
                <button 
                    type="button" 
                    onClick={handleGetLocation}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400"
                    title="Use my location"
                >
                    <LocationIcon />
                </button>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <SearchIcon />
                {isLoading ? 'Searching...' : 'Find Vibes'}
            </button>
        </form>
    );
};

export default SearchBar;
