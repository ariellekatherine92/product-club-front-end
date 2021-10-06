import React, { useState, useCallback } from 'react';
// make some changes
const SearchForm = () => {
    const [locationInput, setLocationInput] = useState('');

    const onSubmit = useCallback(e => {
        e.preventDefault();

        console.log(locationInput);
    }, [locationInput]);

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
