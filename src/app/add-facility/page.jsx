'use client';
import { Input, Form, TextField, Label, FieldError, Description, Button, Select, ListBox, TextArea } from '@heroui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const AddFacilities = () => {
    const router = useRouter();

    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user
    //console.log('user from add facility page', user);

    const [slotInput, setSlotInput] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);


    const addSlot = () => {
        const trimmed = slotInput.trim();
        if (!trimmed) return;
        if (timeSlots.includes(trimmed)) {
            toast('That slot is already added', { type: 'warning' });
            return;
        }
        setTimeSlots([...timeSlots, trimmed]);
        setSlotInput('');
    };

    //console.log(timeSlots, 'timeSlots');

    const removeSlot = (slotToRemove) => {
        setTimeSlots(timeSlots.filter((slot) => slot !== slotToRemove));
    };

    const handleSlotKeyDown = (event) => {
        // let Enter add a slot instead of submitting the form
        if (event.key === 'Enter') {
            event.preventDefault();
            addSlot();
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const facility = Object.fromEntries(formData.entries());
        facility.availableTimeSlots = timeSlots; // array, not part of native FormData

        //console.log('facility data to be sent to server', facility);

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(facility),
        });

        const data = await res.json();
        //console.log('Response from server:', data);
        toast("Facility added successfully!", { type: "success" });
        router.push('/facilities');
    }

    return (
        <div className="min-h-screen bg-background add_facility_page">
            <div className="bg-white border-b border-[rgba(0,0,0,0.06)] py-10">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-medium text-default">Add New Facility</h1>
                    <p className="text-gray-400 text-sm mt-1 font-light">List your sports venue on SportNest</p>
                </div>
            </div>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.05)]">
                    <Form onSubmit={onSubmit} className="space-y-5 add_facility_form">
                        <div>
                            <TextField
                                isRequired
                                name="facilityName"
                                type="text"
                            >
                                <Label className='form_label'>Facility Name</Label>
                                <Input type="text" name="facilityName" placeholder="e.g. Greenside Football Arena" className="form_input" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <Label className='form_label'>Facility Type *</Label>
                                <select
                                    className="w-full px-3.5 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#3d8b5e] transition-colors text-gray-600"
                                    name="facilityType"
                                >
                                    <option value="Football">⚽ Football</option>
                                    <option value="Badminton">🏸 Badminton</option>
                                    <option value="Tennis">🎾 Tennis</option>
                                    <option value="Swimming">🏊 Swimming</option>
                                    <option value="Basketball">🏀 Basketball</option>
                                    <option value="Cricket">🏏 Cricket</option>
                                </select>

                            </div>
                            <div>
                                <TextField
                                    isRequired
                                    name="location"
                                    type="text"
                                >
                                    <Label className='form_label'>Location</Label>
                                    <Input type="text" placeholder="e.g. Brooklyn, New York" className="form_input" />
                                    <FieldError />
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    isRequired
                                    name="price"
                                    type="number"
                                >
                                    <Label className='form_label'>Price Per Hour (USD)</Label>
                                    <Input type="number" placeholder="$  50" className="form_input" />
                                    <FieldError />
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    isRequired
                                    name="capacity"
                                    type="number"
                                >
                                    <Label className='form_label'>Capacity (people)</Label>
                                    <Input type="number" placeholder="e.g. 22" className="form_input" />
                                    <FieldError />
                                </TextField>
                            </div>
                        </div>
                        <div>
                            <TextField
                                isRequired
                                name="image"
                                type="url"
                            >
                                <Label className='form_label'>Image URL</Label>
                                <Input type="url" placeholder="e.g. https://example.com/image.jpg" className="form_input" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className='mb-0'>
                            <TextField
                                isRequired
                                name="availableTimeSlots"
                                type="text"
                            >
                                <input type="hidden" name="availableTimeSlots" value={timeSlots} />
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                type="text"
                            >
                                <Label className='form_label'>Available Time Slots</Label>
                                <div className="flex gap-2 items-center">
                                    <Input type="text" placeholder="e.g. 06:00 AM – 08:00 AM" className="form_input flex-1" value={slotInput}
                                        onChange={(e) => setSlotInput(e.target.value)}
                                        onKeyDown={handleSlotKeyDown} />
                                    <button onClick={addSlot} type="button" className="px-4 py-2.5 bg-[#3d8b5e] text-white rounded-xl text-sm hover:bg-[#326d4b] transition-colors flex items-center gap-1 font-normal">+ Add</button>
                                </div>
                                {timeSlots.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {timeSlots.map((slot) => (
                                            <span
                                                key={slot}
                                                className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full"
                                            >
                                                {slot}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSlot(slot)}
                                                    className="hover:text-emerald-900"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {timeSlots.length === 0 && (
                                    <p className="text-xs text-gray-400 mt-1.5 font-light">Add at least one time slot</p>
                                )}
                            </TextField>
                        </div>

                        <div>
                            <TextField
                                isRequired
                                name="description"
                                type="text"
                            >
                                <Label className='form_label'>Description</Label>
                                <TextArea
                                    aria-label="Quick project update"
                                    className="form_input h-32 w-full"
                                    placeholder="Describe your facility, amenities, and rules..."
                                />
                                <FieldError />
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                            >
                                <Label className='form_label'>Owner Email (auto-filled)</Label>
                                <Input type="email" value={user?.email} readOnly className="form_input" />
                            </TextField>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="submit" className="flex-1 bg-[#3d8b5e] text-white py-3 rounded-xl text-sm hover:bg-[#326d4b] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 font-normal">
                                + List Facility
                            </button>
                            <button type='button' className="px-6 py-3 border border-[rgba(0,0,0,0.08)] rounded-xl text-sm text-gray-500 hover:bg-background transition-colors font-light">
                                <Link href="/facilities">
                                    Cancel
                                </Link>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddFacilities;