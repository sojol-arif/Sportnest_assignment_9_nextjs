'use client';

import EditFacilityModal from "./EditFacilityModal";
import MyFacilities from "./MyFacilities";
import { useState } from "react";

const MyFacilitiesManage = ({ myFacilities }) => {
    const [editingFacility, setEditingFacility] = useState(null);

    return (
        <>
            <div className="bg-white border-b border-[rgba(0,0,0,0.06)] py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-medium text-[#1a1a1e]">Manage My Facilities</h1>
                        <p className="text-gray-400 text-sm mt-1 font-light">1 facility listed</p>
                    </div>
                    <a className="bg-[#3d8b5e] text-white text-sm px-5 py-2.5 rounded-xl hover:bg-[#326d4b] transition-colors flex items-center gap-2 font-normal" href={'/add-facility'} data-discover="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                        Add New
                    </a>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                    {
                        myFacilities.length > 0 ? (
                            myFacilities.map((facility) => (
                                <MyFacilities key={facility._id} facility={facility}
                                onEdit={() => setEditingFacility(facility)} />
                            ))
                        )
                            :
                            (
                                <p>There is no Facilities</p>
                            )
                    }
                </div>
            </div>
            {editingFacility && (
                <EditFacilityModal
                    facility={editingFacility}
                    onClose={() => setEditingFacility(null)}
                />
            )}
        </>
    );
};

export default MyFacilitiesManage;