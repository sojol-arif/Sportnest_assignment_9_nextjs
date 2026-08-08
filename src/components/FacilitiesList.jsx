'use client'
import { useState, useMemo } from 'react';
import FacilityCard from '@/components/FacilityCard';

const FacilitiesList = ({ facilities }) => {
    const [search, setSearch] = useState('');
    const [sport, setSport] = useState('All');
    console.log(sport);

    const matchesSearch = (facility, search) => {
        return facility.facilityName
            .toLowerCase()
            .includes(search.toLowerCase());
    };

    const matchesSport = (facility, sport) => {
        return sport === 'All' || facility.facilityType === sport;
    };

    const matchesFilters = (facility, search, sport) => {
        return matchesSearch(facility, search) && matchesSport(facility, sport);
    };

    const filteredFacilities = useMemo(() => {
        return facilities.filter((facility) => matchesFilters(facility, search, sport));
    }, [facilities, search, sport]);

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by facility name or location..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative flex-shrink-0">
                    <select
                        className="appearance-none w-full sm:w-52 pl-4 pr-9 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm text-gray-600 focus:outline-none focus:border-[#3d8b5e] transition-colors cursor-pointer"
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                    >
                        <option value="All">All Sports</option>
                        <option value="Football">⚽ Football</option>
                        <option value="Badminton">🏸 Badminton</option>
                        <option value="Tennis">🎾 Tennis</option>
                        <option value="Swimming">🏊 Swimming</option>
                        <option value="Basketball">🏀 Basketball</option>
                        <option value="Cricket">🏏 Cricket</option>
                    </select>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    >
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-5">{filteredFacilities.length} facilities found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredFacilities.map((facility) => (
                    <FacilityCard key={facility._id} facility={facility} />
                ))}
            </div>
        </>
    );
};

export default FacilitiesList;
