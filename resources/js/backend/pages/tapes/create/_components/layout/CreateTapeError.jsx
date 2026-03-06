import React from 'react';

function CreateTapeError({ message }) {
    if (!message) {
        return null;
    }

    return <div className="alert alert-error mb-4 py-2 text-sm">{message}</div>;
}

export default CreateTapeError;
