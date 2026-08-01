'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Users, MapPin, Clock } from 'lucide-react';

const FacilityCard = ({ facility }) => {
    const { facilityName, location, price, capacity, image, availableTimeSlots, description, _id, facilityType } = facility;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 group flex flex-col">
            <div className="relative overflow-hidden h-48 bg-gray-100">
                <Image
                    src={image}
                    alt={facilityName}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3"><span className="bg-emerald-50 text-emerald-700 text-xs font-normal px-3 py-1 rounded-full backdrop-blur-sm">{facilityType}</span></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-medium text-default text-[15px] mb-1 leading-snug line-clamp-1">{facilityName}</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <MapPin width={11} height={11} />
                    <span>{location}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed">{description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Users width={11} height={11} className="text-[#3d8b5e]" />
                        <span>{capacity} capacity</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Clock width={11} height={11} className="text-[#3d8b5e]" />
                        <span>{availableTimeSlots.length} slots</span>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div><span className="text-lg font-medium text-[#3d8b5e]">${price}</span><span className="text-xs text-gray-400 ml-0.5">/hr</span></div>
                    <button className="bg-[#3d8b5e] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#326d4b] active:scale-95 transition-all duration-150 font-normal">
                        <Link href={`/facilities/${_id}`}>Book Now</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacilityCard;