import React from 'react';
import './WeatherAlertLegend.css';

export const ALERTS = {
    NORMAL: {
        type: 'normal',
        label: 'Normal',
        description: 'The weather is safe.',
    },
    WATCH: {
        type: 'watch',
        label: 'WATCH',
        description: 'The weather has potential to become severe but not expected.',
    },
    WARNING: {
        type: 'warning',
        label: 'WARNING',
        description: 'Severe weather is expected but is not considered to be life-threatening.',
    },
    ADVISORY: {
        type: 'advisory',
        label: 'ADVISORY',
        description: 'Life-threatening weather is expected. Take Action!',
    },
};

const WeatherAlertLegend = () => {
    return (
        <div className="weather-alert-legend">
            <h3>Weather Alert Legend</h3>
            <table>
                {Object.keys(ALERTS).map(key => {
                    const { type, label, description } = ALERTS[key];

                    return (
                        <tr key={`alert-legend-${type}`}>
                            <td>
                                <div className={`alert-status ${type}`} />
                            </td>
                            <td>{label}</td>
                            <td>{description}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

export default WeatherAlertLegend;
