// FIX: Import React to resolve undefined namespace error.
import React from 'react';
import type { Event } from '../types';
import EventCard from './EventCard';

interface CategoryCarouselProps {
    title: string;
    events: Event[];
}

// FIX: Corrected component type from custom 'FC' to 'React.FC' to resolve generic type error.
const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ title, events }) => {
    if (!events || events.length === 0) {
        return null;
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
                {events.map((event, index) => (
                    <EventCard key={`${event.name}-${index}`} event={event} />
                ))}
            </div>
        </section>
    );
};

export default CategoryCarousel;