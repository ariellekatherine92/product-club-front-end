import React from 'react';
import { useLocation } from 'react-router-dom';

const Map = () => {
    const location = useLocation();

    const zip = location.search.split('=')[1];

    return (
        <section>
            <h1>{zip}</h1>
        </section>
    );
};

export default Map;
