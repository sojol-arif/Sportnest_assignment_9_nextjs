import MyBookingCard from '@/components/MyBookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    console.log('user from my bookings page', user);

    const res = await fetch(`http://localhost:5000/booking/${user?.id}`);
    const bookingData = await res.json();
    console.log('booking data from my bookings page', bookingData);

    return (
        <div className="min-h-screen bg-[#f4f6f2]">
            <div className="bg-white border-b border-[rgba(0,0,0,0.06)] py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-medium text-[#1a1a1e]">My Bookings</h1>
                    <p className="text-gray-400 text-sm mt-1 font-light">1 total booking</p>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div>
                    <h2 className="text-sm font-medium text-[#1a1a1e] mb-3">Active Bookings</h2>
                    <div className="space-y-3">
                        {bookingData?.map((booking) => (
                            <MyBookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookingPage;