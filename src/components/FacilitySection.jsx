import React from 'react';
import FacilityCard from './FacilityCard';
import Link from 'next/link';



const FacilitySection = async () => {
    const res = await fetch('http://localhost:5000/facility');

    const facilities = await res.json();
    console.log(facilities, 'from frontend Facility Seciton');

    return (
        <div className='container_s py-8'>
            <div className="flex items-end justify-between mb-10"><div>
                <h2 className="text-2xl font-medium text-[#1a1a1e] mb-1">Featured Facilities</h2>
                <p className="text-gray-400 text-sm font-light">Handpicked top venues near you</p>
            </div>
                <Link href={`/facilities`} className="text-[#3d8b5e] text-sm hover:underline flex items-center gap-1 font-normal" data-discover="true">View all
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"></path></svg>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {facilities.slice(0, 8).map((facility) => (
                    <FacilityCard key={facility._id} facility={facility} />
                ))}
            </div>
        </div>
    );
};

export default FacilitySection;