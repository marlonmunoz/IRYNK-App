import React from "react";

function Contact() {
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </form>
        </div>
    )
};

export default Contact;