"use client";

import Image from "next/image";
import { MyFacilitiesDeleteAlert } from "./MyFacilityDeleteAlert";

const MyFacilities = ({ facility, onEdit }) => {
    const { facilityName, location, price, capacity, image, availableTimeSlots, description, _id, facilityType } = facility || {};

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.05)]" key={_id}>
            <div className="relative h-40 bg-gray-100">
                <Image
                    src={image || "/images/placeholder.png"}
                    alt={facilityName || "Facility Image"}
                    className="w-full h-full object-cover"
                    width={288}
                    height={160}
                />
                <div className="absolute top-2 left-2">
                    <span className="bg-sky-50 text-sky-700 text-[10px] px-2.5 py-1 rounded-full">
                        {facilityType === 'Football' ? <span>⚽</span> : facilityType === 'Badminton' ? <span>🏸</span> : facilityType === 'Basketball' ? <span>🏀</span> : facilityType === 'Tennis' ? <span>🎾</span> : facilityType === 'Cricket' ? <span>🏏 </span> : facilityType === 'Swimming' ? <span>🏊 </span> : ''}
                        <span>{facilityType}</span>
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-[#1a1a1e] text-sm mb-0.5 line-clamp-1">{facilityName || "Facility Name"}</h3>
                <p className="text-gray-400 text-xs mb-1 font-light">{description || "No description available"}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-light">
                    <span>${price || 0}/hr</span><span>·</span><span>{capacity || 0} cap.</span><span>·</span>
                    {Array.isArray(availableTimeSlots) ?
                        (
                            <span>
                                {availableTimeSlots.length} slots
                            </span>
                        )
                        :
                        (
                            <span>
                                1 slots
                            </span>
                        )}
                </div>
                <div className="flex gap-2">
                    <button
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 border border-[rgba(0,0,0,0.08)] rounded-lg text-gray-500 hover:bg-[#f4f6f2] transition-colors font-normal"
                        onClick={onEdit}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pen"
                        >
                            <path
                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                            ></path>
                        </svg>
                        Edit
                    </button>
                    <MyFacilitiesDeleteAlert facilityId={_id} />
                </div>
            </div>
        </div>
    );
};

export default MyFacilities;