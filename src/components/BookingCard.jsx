'use client'

import { authClient } from '@/lib/auth-client';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const BookingCard = ({ facility }) => {

    const {
        data: session,
    } = authClient.useSession();
    //console.log('session from bookin bard', session)
    const user = session?.user
    //console.log('user from booking card', user);

    const { facilityName, facilityType, location, price, capacity, image, availableTimeSlots, description, _id } = facility

    const [bookedDate, setBookedDate] = useState(null);

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingData = {
            userId: user?.id,
            userImg: user?.image,
            user_email: user?.email,
            facilityId: _id,
            facilityName,
            facilityImage: image,
            facilityType,
            timeSlot: availableTimeSlots,
            hours: '1', /* need code */
            totalPrice: price,
            status: 'pending', /* need code */
            bookingDate: new Date(bookedDate) /* need code */

        }

        const {data:tokenData} = await authClient.token();
        console.log('tokenData from booking card', tokenData);

        // //console.log('bookingData', bookingData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}` // Include the access token in the Authorization header
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();
        //console.log('booking response', data);

        if (data) {
            toast('Booking Confirmed!', { type: 'success' });
        }
    }
    return (
        <div className='bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.05)] sticky top-24'>
            <h2 className="font-medium text-[#1a1a1e] mb-5 text-base">Book This Facility</h2>
            <form onSubmit={handleBooking} className="space-y-4">
                <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-normal">Facility</label>
                    <input type="text" readOnly="" className="w-full px-3 py-2.5 bg-[#f4f6f2] border border-[rgba(0,0,0,0.06)] focus:border-[#3d8b5e] focus:outline-none rounded-xl text-sm text-gray-500 font-light" defaultValue={facilityName} />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-normal">Booking Date</label>
                    <input onChange={(e) => setBookedDate(e.target.value)} defaultValue={bookedDate || ''} type="date" min="2026-07-23" className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors text-default" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-normal">Time Slot</label>
                    <select className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors text-default">
                        <option value="">Select a time slot</option>
                        {Array.isArray(availableTimeSlots) ?
                            availableTimeSlots.map(slots => (
                                <option value={slots} key={slots}>{slots}</option>
                            )) :
                            (
                                <option value={availableTimeSlots}>{availableTimeSlots}</option>
                            )}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-normal">Hours</label>
                    <input type="number" min="1" max="8" className="w-full px-3 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors text-default" defaultValue='1' />
                </div>
                <div className="bg-[#f0faf5] rounded-xl p-3.5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Price</span>
                    <span className="font-medium text-[#3d8b5e] text-lg">${price}</span>
                </div>
                <button type="submit" className="w-full bg-[#3d8b5e] text-white py-3 rounded-xl text-sm hover:bg-[#326d4b] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 font-normal">Confirm Booking</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default BookingCard;