import React, { useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value})  
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5002/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message.');
        }
    };




    return (
        <div className="container mt-5 ">
            <div className="card transparent-card">
                <div className="card-body">
                    <h5 className="card-title">Contact Me</h5 >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label> 
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>  

                        <div className="form-group">              
                            <label htmlFor="email">Email: </label>
                            <input type="email" className="form-control w-100" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" /> 
                        </div>  

                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;