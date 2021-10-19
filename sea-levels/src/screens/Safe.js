import React from 'react'
import "./safe.css"


export default function Safe() {
    return (
    <div className="main-safe">
        <div className = "safe-header">
            <h1>Stay safe. Stay Connected.</h1>
        </div>
        <div className= "image-1">
            <h3 className="meet-richard">Meet Richard without Weather Together.</h3>
        </div>
        <div className="image-2">
            <h3 className="meet-madeline">Meet Madeline with Weather Together.</h3>
        </div>
        <div className="winter-storm">
            <h3 className="winter-heading">Both Madeline and Richard got hit by a winter storm.</h3>
        </div>
        <div className="lonely-man">
            <h3 className="lonely-man-heading">Richard got left in the dark.</h3>
        </div>
        <div className="prepared">
            <h3 className="prepared-heading"> Madeline Knew in advance.</h3>
        </div>
        <div className="supplies">
            <h3 className="supplies-heading">Richard was low on supplies.</h3>
        </div>
        <div className="flashlight">
            <h3 className="flashlight-heading">Madeline had what she needed.</h3>
        </div>
        <div className="broken-phone">
            <h3 className="broken-phone">Richard could not reach 911.</h3>
        </div>
        <div className="door">
            <h3 className="door-heading">Madeline helped out her neighbors</h3>
        </div>
        <div className="join-us">
            <h1 className="join-us-heading"> You can be like Madeline too!</h1>
            <button onSubmit="join-us-button"> Join Weather Together</button>
        </div>
    </div>

    )
}
