
import React from 'react';
import type { Event } from '../types';
import EventCard from './EventCard';

interface CategoryCarouselProps {
    title: string;
    events: Event[];
}

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
