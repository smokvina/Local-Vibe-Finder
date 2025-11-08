// FIX: Import React and hooks to resolve undefined errors.
import React, { useRef } from 'react';
import type { TimeStatus } from '../types';

type FilterType = TimeStatus | 'CUSTOM';

interface TimeFilterProps {
    currentFilter: FilterType;
    setFilter: (filter: FilterType) => void;
    setCustomDate: (date: string) => void;
}

// FIX: Corrected component type from custom 'FC' to 'React.FC' to resolve generic type error.
const TimeFilter: React.FC<TimeFilterProps> = ({ currentFilter, setFilter, setCustomDate }) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    // FIX: Corrected event type from custom 'ChangeEvent' to 'React.ChangeEvent' to resolve generic type error.
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomDate(e.target.value);
        setFilter('CUSTOM');
    };

    const handleDateButtonClick = () => {
        dateInputRef.current?.showPicker();
    };

    const getButtonClass = (filter: FilterType) => {
        return `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            currentFilter === filter 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`;
    };

    return (
        <div className="flex flex-wrap justify-center items-center gap-2">
            <button onClick={() => setFilter('DANAS')} className={getButtonClass('DANAS')}>
                Danas
            </button>
            <button onClick={() => setFilter('OVOG_TJEDNA')} className={getButtonClass('OVOG_TJEDNA')}>
                Ovog Tjedna
            </button>
            <button onClick={() => setFilter('OVOG_MJESECA')} className={getButtonClass('OVOG_MJESECA')}>
                Ovog Mjeseca
            </button>
            <div className="relative">
                 <button onClick={handleDateButtonClick} className={getButtonClass('CUSTOM')}>
                    Točan Datum
                </button>
                <input
                    type="date"
                    ref={dateInputRef}
                    onChange={handleDateChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default TimeFilter;