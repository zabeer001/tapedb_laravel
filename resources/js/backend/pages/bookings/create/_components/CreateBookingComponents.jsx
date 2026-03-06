import React from 'react';
import CreateBookingHeader from './CreateBookingHeader';
import CreateBookingError from './CreateBookingError';
import CreateBookingForm from './CreateBookingForm';



export default function CreateBookingComponents() {
    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body p-8">
                    <CreateBookingHeader />
                    <CreateBookingError />
                    <CreateBookingForm />
                </div>
            </section>
        </div>
    );
}

export { CreateBookingHeader, CreateBookingError, CreateBookingForm };
