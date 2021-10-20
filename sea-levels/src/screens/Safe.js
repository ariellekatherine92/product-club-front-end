import React from 'react';
import './safe.css';

export default function Safe() {
    return (
        <div className="main-safe">
            <h2>Stay safe. Stay Connected.</h2>
            
            <div className="safe-row">
                <div className="item">
                    <h5>Meet Richard without Weather Together.</h5>
                    <div className="image-wrapper owen" />
                </div>

                <div className="item">
                    <h5>Meet Madeline with Weather Together.</h5>
                    <div className="image-wrapper mary" />
                </div>
            </div>
            
            <div className="safe-row">
                <div className="item">
                    <h5>Both Madeline and Richard got hit by a winter storm.</h5>
                    <div className="image-wrapper winter-storm" />
                </div>
            </div>

            <div className="safe-row">
                <div className="item">
                    <h5>Richard got left in the dark.</h5>
                    <div className="image-wrapper lonely-man" />
                </div>

                <div className="item">
                    <h5>Madeline Knew in advance.</h5>
                    <div className="image-wrapper prepared" />
                </div>
            </div>

            <div className="safe-row">
                <div className="item">
                    <h5>Richard was low on supplies.</h5>
                    <div className="image-wrapper supplies" />
                </div>

                <div className="item">
                    <h5>Madeline had what she needed.</h5>
                    <div className="image-wrapper flashlight" />
                </div>
            </div>

            <div className="safe-row">
                <div className="item">
                    <h5>Richard could not reach 911.</h5>
                    <div className="image-wrapper broken-phone" />
                </div>

                <div className="item">
                    <h5>Madeline helped out her neighbors.</h5>
                    <div className="image-wrapper door" />
                </div>
            </div>
            
            <h2>You can be like Madeline too.</h2>
            
            <div className="btn-wrapper">
                <button>Join Waterproof</button>
            </div>
        </div>
    );
}
