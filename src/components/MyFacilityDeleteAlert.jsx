"use client";

import { AlertDialog, Button } from "@heroui/react";

export function MyFacilitiesDeleteAlert({ facilityId }) {

    const handleDeleteFacility = async (facilityId) => {
        try {
            const response = await fetch(`http://localhost:5000/facilities/${facilityId}`, {
                cache: 'no-store',
                method: 'DELETE',
            });
            if (response.ok) {
                //console.log('Facility deleted successfully');
                // Optionally, you can update the UI or state to reflect the deletion
            }
        } catch (error) {
            console.error('Error deleting facility:', error);
        }
    }


    return (
        <AlertDialog>
            <Button
                className="bg-transparent flex-1 flex items-center justify-center gap-1.5 text-xs py-2 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition-colors font-normal"
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
                    className="lucide lucide-trash2 lucide-trash-2"
                >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                Delete
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger className="text-white"/>
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Facility permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>the facility</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="danger" onClick={() => handleDeleteFacility(facilityId)}
                                className="bg-transparent border border-[#ff6467] text-red-400">
                                Delete Facility
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}