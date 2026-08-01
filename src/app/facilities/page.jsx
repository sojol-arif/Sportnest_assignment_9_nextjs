import FacilityCard from '@/components/FacilityCard';

const Facilities = async () => {
    const res = await fetch('http://localhost:5000/facility');

    const facilities = await res.json();
    console.log(facilities, 'from frontend Facilities Page');

    return (
        <div>
            <div className="min-h-screen bg-background add_facility_page">
                <div className="bg-white border-b border-[rgba(0,0,0,0.06)] py-10">
                    <div className="container_s">
                        <h1 className="text-2xl font-medium text-default">All Facilities</h1>
                        <p className="text-gray-400 text-sm mt-1 font-light">Discover available sports venues near you</p>
                    </div>
                </div>
                <div className="container_s py-8">
                    <p className="text-xs text-gray-400 mb-5">{facilities.length} facilities found</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {facilities.map((facility) => (
                            <FacilityCard key={facility._id} facility={facility} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Facilities;