"use client";

import {AlertDialog, Button} from "@heroui/react";

export function BookingCancelAlert({ bookingId }) {

  const handleCancelBooking = async (bookingId) => {
    const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
      cache: 'no-store',
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      }
    });

    const data = await res.json();

    console.log(data, 'data from booking cancel alert');

  }

  return (
    <AlertDialog>
      <Button variant="danger" className="text-xs text-red-400 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors bg-transparent font-normal h-auto">Cancel</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger className="text-white"/>
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel <strong>your booking</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="primary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={() => handleCancelBooking(bookingId)}
                className="bg-transparent border border-[#ff6467] text-red-400">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}