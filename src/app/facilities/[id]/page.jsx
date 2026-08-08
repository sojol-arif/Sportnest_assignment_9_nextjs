import React from 'react';
import Image from 'next/image';
import { Users, MapPin, Clock, DollarSign, Target } from 'lucide-react';
import BookingCard from '@/components/BookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const FacilityDetails = async ({ params }) => {
    const { id } = await params;
    //console.log(id, 'from frontend Facility Details Page');

    const { token } = await auth.api.getToken({
        headers: await headers()
    });
    //console.log(token);

    const res = await fetch(`http://localhost:5000/facility/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const facility = await res.json();

    const { facilityName, facilityType, location, price, capacity, image, availableTimeSlots, description, _id } = facility

    const facilityOverview = [
        { icon: DollarSign, middleText: 'Per Hour', lastText: `$${price}` },
        { icon: Users, middleText: 'Capacity', lastText: `${capacity} people` },
        {
            icon: Clock, middleText: 'Time Slots', lastText: `${Array.isArray(availableTimeSlots) ?
                (
                    `${availableTimeSlots.length} available`
                )
                :
                ('1 available')}`
        },
        { icon: Target, middleText: 'Bookings', lastText: `89+ made` },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="relative h-64 sm:h-80 bg-gray-200">
                <Image
                    src={image}
                    width={600}
                    height={400}
                    alt={facilityName}
                    className='w-full h-full object-cover'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 container_s pb-6">
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full mb-2 inline-block">{facilityType}</span>
                    <h1 className="text-2xl sm:text-3xl font-light text-white">{facilityName}</h1>
                    <div className="flex items-center gap-1.5 text-gray-300 text-sm mt-1">
                        <MapPin width={11} height={11} />
                        <span>{location}</span>
                    </div>
                </div>
            </div>
            <div className='container_s py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-5'>
                        <div className='bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.05)]'>
                            <h2 className='font-medium text-default mb-5 text-base'>Facility Overview</h2>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5'>
                                {facilityOverview.map((facilityO) =>
                                (
                                    <div key={facilityO.middleText} className="text-center p-3 bg-background rounded-xl">
                                        <facilityO.icon width={15} height={15} className='text-[#3d8b5e] mx-auto mb-1.5' />
                                        <div className="text-xs text-gray-400 mb-0.5 font-light">{facilityO.middleText}</div>
                                        <div className="text-sm font-medium text-default">{facilityO.lastText}</div>
                                    </div>
                                )
                                )}

                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                {description}
                            </p>
                        </div>
                        <div className='bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.05)]'>
                            <h2 className="font-medium text-[#1a1a1e] mb-4 text-base">Available Time Slots</h2>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(availableTimeSlots) ?
                                    availableTimeSlots.map(slots => (
                                        <span key={slots} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#f0faf5] text-[#3d8b5e] rounded-full border border-[#3d8b5e]/15">
                                            <Clock width={10} height={10} />
                                            {slots}
                                        </span>
                                    )) :
                                    (
                                        <span key={availableTimeSlots} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#f0faf5] text-[#3d8b5e] rounded-full border border-[#3d8b5e]/15">
                                            <Clock width={10} height={10} />
                                            {availableTimeSlots}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <BookingCard facility={facility} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilityDetails;