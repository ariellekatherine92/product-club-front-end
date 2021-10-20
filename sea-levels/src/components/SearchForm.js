import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { datadogLogs } from '@datadog/browser-logs';
import { connect } from 'react-redux'
import { addLocation } from '../action';

// make some changes
const SearchForm = (props) => {
    const history = useHistory();

    const [locationInput, setLocationInput] = useState('');

    const onSubmit = useCallback(e => {
        e.preventDefault();

        datadogLogs.logger.info('Form Submitted', { name: 'main-search-form', value: locationInput });
        props.addLocation(`${locationInput}`)
        history.push(`/dashboard`);
    }, [locationInput, history]);

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input 
                type="text" 
                name="location"
                placeholder="Enter a Zip Code"
                onChange={({ target }) => setLocationInput(target.value)}
            />
            <button 
                type="submit">
                Get Started
            </button>
        </form>
    )
};



const mapDispatchToProps = dispatch => {
  return { addLocation: text => dispatch(addLocation(text))};
  };

  export default connect(null, mapDispatchToProps)(SearchForm);