import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';

// make some changes
const SearchForm = () => {
    const history = useHistory();

    const [locationInput, setLocationInput] = useState('');

    const onSubmit = useCallback(e => {
        e.preventDefault();

        datadogLogs.logger.info('Form Submitted', { name: 'main-search-form', value: locationInput });

        history.push(`map?location=${locationInput}`);
    }, [locationInput, history]);

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input 
                type="text" 
                name="location"
                placeholder="Enter an Address or Zip Code"
                onChange={({ target }) => setLocationInput(target.value)}
            />
            <button 
                type="submit">
                Get Started
            </button>
        </form>
    )
};

export default SearchForm;
