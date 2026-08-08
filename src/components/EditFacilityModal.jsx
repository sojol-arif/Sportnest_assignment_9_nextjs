import React from 'react';

const EditFacilityModal = ({ facility, onClose }) => {

    const handleUpdateMyFacility = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        //console.log('form data', formData);
        const facilityData = Object.fromEntries(formData.entries());
        //console.log(facilityData, 'from edit save modal');

        //console.log('facility id from edit modal', facility);

        const res = await fetch(`http://localhost:5000/facilities/${facility._id}`, {
            cache: 'no-store',
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(facilityData)
        })
        const data = await res.json();
        //console.log(data, 'data from edit destination front end');
        onClose(); 
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-medium text-[#1a1a1e]">Edit Facility</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x"
                        >
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleUpdateMyFacility}>
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Facility Name</label
                        ><input
                            type="text"
                            className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors"
                            defaultValue={facility?.facilityName || ''} name="facilityName"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Location</label
                        ><input
                            type="text"
                            className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors"
                            defaultValue={facility?.location || ''} name="location"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Price Per Hour ($)</label
                        ><input
                            type="number"
                            className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors"
                            defaultValue={facility?.price || ''} name="price"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Capacity (people)</label
                        ><input
                            type="number"
                            className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors"
                            defaultValue={facility?.capacity || ''} name="capacity"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">Description</label
                        ><textarea
                            rows="3"
                            className="w-full px-3.5 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] resize-none leading-relaxed"
                            defaultValue={facility?.description || ''} name="description"
                        >

                        </textarea>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            className="flex-1 bg-[#3d8b5e] text-white py-2.5 rounded-xl text-sm hover:bg-[#326d4b] transition-colors font-normal" type="submit"
                        >
                            Save Changes</button
                        ><button
                            className="px-5 py-2.5 border border-[rgba(0,0,0,0.08)] rounded-xl text-sm text-gray-500 hover:bg-[#f4f6f2] font-light"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFacilityModal;