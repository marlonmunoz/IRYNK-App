import React from "react";

function Contact() {
    return (
        <div className="contactCard">
            <form>
                <p>If you have any question, please email me.</p>
                <label htmlFor="email" id="e-card">Email: </label>
                <input type="email" id="email" name="email" required autoComplete="email" />
            </form>
        </div>
    )
};

export default Contact;