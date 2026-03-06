import React from 'react';

function TapesPageError({ message }) {
    if (!message) {
        return null;
    }

    return <div className="alert alert-error py-2 text-sm">{message}</div>;
}

export default TapesPageError;
