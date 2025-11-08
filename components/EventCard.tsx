
import React from 'react';
import type { Event } from '../types';
import { CATEGORY_MAP } from '../constants';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`;

    return (
        <div className="flex-shrink-0 w-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold mb-2 text-purple-300 pr-2">{event.name}</h3>
                     <span className="text-2xl flex-shrink-0">{CATEGORY_MAP[event.category].title.split(' ')[0]}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{event.dateTime}</p>
                <p className="text-gray-300 text-sm mb-4 h-20 overflow-y-auto custom-scrollbar">{event.description}</p>
                
                <div className="space-y-3">
                     <a 
                        href={mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{event.address}</span>
                    </a>
                    <a 
                        href={event.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        View Source
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
