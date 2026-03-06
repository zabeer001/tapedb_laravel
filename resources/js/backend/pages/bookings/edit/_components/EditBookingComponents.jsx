import React from 'react';
import EditBookingHeader from './EditBookingHeader';
import EditBookingError from './EditBookingError';
import EditBookingForm from './EditBookingForm';

export default function EditBookingComponents({ bookingId }) {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body p-8">
                    <EditBookingHeader />
                    <EditBookingError />
                    <EditBookingForm bookingId={bookingId} />
                </div>
            </section>
        </div>
    );
}
