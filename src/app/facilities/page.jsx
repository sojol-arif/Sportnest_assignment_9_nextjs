import FacilitiesList from '@/components/FacilitiesList';

const Facilities = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`);
    const facilities = await res.json();

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
                    <FacilitiesList facilities={facilities} />
                </div>
            </div>
        </div>
    );
};

export default Facilities;
