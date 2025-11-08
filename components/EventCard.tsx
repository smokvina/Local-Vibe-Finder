// FIX: Import React to resolve undefined namespace error.
import React from 'react';
import type { Event } from '../types';

interface EventCardProps {
    event: Event;
}

// FIX: Corrected component type from custom 'FC' to 'React.FC' to resolve generic type error.
const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="flex-shrink-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
            {event.vibe && (
                <span className="self-start text-xs font-bold bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-full mb-3">
                    {event.vibe}
                </span>
            )}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 h-14 overflow-hidden">{event.name}</h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">🗓️ {event.dateTime}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 truncate">📍 {event.address}</p>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 h-24 overflow-y-auto custom-scrollbar-thin">
                    {event.description}
                </p>
                {event.extraDetails && (
                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-4 italic p-2 bg-purple-500/10 dark:bg-purple-900/20 rounded-md">
                        "{event.extraDetails}"
                    </p>
                )}
            </div>
            <a 
                href={event.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-auto block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors duration-200"
            >
                View Source
            </a>
        </div>
    );
};

export default EventCard;