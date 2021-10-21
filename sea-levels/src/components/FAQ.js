import React from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';

export default function FAQ() {
    return (
        <div>
            <div className="faq-main">
                <h1 className="main-header">FAQ</h1>
                <div>
                    <span>Q: What does Weather Together do?</span>
                    <p>A: Weather Together excels at 3 things. 1. We keep people up to date with real-time weather alerts with easy to understand threat levels.
                    2. We provide a checklist system to help people stay prepared for any situation or weather emergency. 3. We equip households seeking aid with a beacon for hope when they are in need. 
                    Other neighbors in your Zip code using Weather 
                    Together will be notified.</p>
                </div>
                <div>
                    <span>Q: How do I add contacts of friends and family?</span>
                    <p>A: Once you have created your profile, there will be an “add new contact” option button. Select it and enter your friend or family information. If you enter an email address, 
                        you have the option to send them a connection invite to join you on 
                        Weather Together.</p>
                </div>
                <div>
                    <span>Q: In an emergency, how do I send an SOS request?</span>
                    <p>A: When you are logged in, select the button “Create SOS” on your dashboard or the “SOS” button on the top NAV. There, you will fill out the Emergency Request Form. Confirm your name and address. Select the emergency type then choose your needs for your household. Verify your entered information is correct then submit. Neighbors using 
                        Weather Together in your Zip code will be notified.</p>
                </div>
                <div>
                    <span>Q: Who sees my SOS requests? How do they contact me?</span>
                    <p>A: Neighbors using Weather Together in your Zip code will be notified of your emergency. Users who choose to respond to your SOS request select the needs
                        on your list to fulfill and send you their email or phone number. </p>
                </div>
                <div>
                    <span>Q: Is this safe? </span>
                    <p>
                    A: We believe in the good in our communities but we should also take precautions. We advise that wary help-seekers meet helpers at nearby addresses or call using *67 to keep your phone number safe. If you are worried, don’t go alone. These feelings can go both ways but in times of crisis where everyone 
                    in the area is affected, we know communites will lock arms with one another and prevail.
                    </p>
                </div>
                <h1>Don’t get left in the dark. Be prepared for anything. Do good, neighbor. </h1>
                <div className="btn-wrapper">
                    <Link to="/signup">
                        <button>Sign up today</button> 
                    </Link>
                </div>
            </div>
        </div>
    )
}
