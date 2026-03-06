import React from 'react';

function ShowTapeError({ message }) {
    if (!message) {
        return null;
    }

    return <div className="alert alert-error py-2 text-sm">{message}</div>;
}

export default ShowTapeError;
