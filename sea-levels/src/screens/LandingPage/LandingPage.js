import React from 'react';
import SearchForm from '../../components/SearchForm';

export default function LandingPage() {
    return (
        <section className="landing-page">
            <div className="bg-image" />
            <div className="content">
                <h1>Be informed,<br/>get prepared</h1>
                <h3>Don't get caught in rain, 
                    search your city now.</h3>

                <SearchForm />


            </div>
        </section>
    );
}

