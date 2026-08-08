'use client';
import Image from "next/image";
import { BookingCancelAlert } from "./BookingCancelAlert";

const MyBookingCard = ({ booking }) => {
    const { _id, userId, userImg, user_email, facilityId, facilityName, facilityImage, facilityType, timeSlot, hours, totalPrice, status, bookingDate } = booking;

    const formatDate = (isoString) => {
        if (!isoString) return '';
        return new Date(isoString).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const timeSlotArr = (() => {
        try {
            return timeSlot ? JSON.parse(timeSlot) : [];
        } catch {
            return timeSlot ? [timeSlot] : [];
        }
    })();

    const handleCancelClick = async () => {
        try {
            const res = await fetch(`http://localhost:5000/booking/${booking._id}`, {
                cache: 'no-store',
                method: 'DELETE', // or PATCH, whatever your API uses
            });

            if (res.ok) {
                onCancel(booking._id); // tells parent to remove it from state
            }
        } catch (err) {
            console.error('Cancel failed', err);
        }
    };

    return (
        <div
            className="bg-white rounded-2xl border border-[rgba(0,0,0,0.05)] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center" key={_id}
        >
            <Image
                src={facilityImage}
                alt={facilityName}
                className="w-20 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                width={80}
                height={64}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-medium text-[#1a1a1e] text-sm leading-snug">{facilityName}</h3>
                    <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-normal flex-shrink-0 bg-amber-50 text-amber-600 border border-amber-200"
                    >{status}</span
                    >
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-light">
                    <span className="flex items-center gap-1"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar"
                    >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path></svg
                        >{formatDate(bookingDate)}</span
                    ><span className="flex items-center gap-1"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock"
                    >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline></svg
                        > {Array.isArray(timeSlotArr) ? timeSlotArr.join(',  ') : timeSlotArr}</span
                    ><span className="flex items-center gap-1"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock"
                    >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline></svg
                        >{hours}</span
                    ><span className="flex items-center gap-1">
                        {facilityType === 'Football' ? <span>⚽</span> : facilityType === 'Badminton' ? <span>🏸</span> : facilityType === 'Basketball' ? <span>🏀</span> : facilityType === 'Tennis' ? <span>🎾</span> : facilityType === 'Cricket'? <span>🏏 </span> :  facilityType === 'Swimming'? <span>🏊 </span>: ''}
                        {facilityType}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:items-end flex-shrink-0">
                <span className="font-medium text-[#1a1a1e] text-base">${Number(totalPrice ?? 0).toFixed(2)}</span
                >
                <BookingCancelAlert bookingId={_id} />
            </div>
        </div>

    );
};

export default MyBookingCard;