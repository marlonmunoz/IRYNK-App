import React from "react";

function Contact() {
    return (
        <div className="contactCard">
            <form>
                <p>If you have any question, please email me.</p>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" required />
            </form>
        </div>
    )
};

export default Contact;