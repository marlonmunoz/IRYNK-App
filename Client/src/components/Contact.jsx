import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Contact() {
    const { message, setMessage, contacts, setContacts } = useOutletContext();
    const initialFormState = {
        name: '',
        email: '',
        message: ''
    }
    const [formData, setFormData] = useState(initialFormState);
    const [charCount, setCharCount] = useState(0)

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:5002/contacts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };
        fetchContacts();
    }, [setContacts]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value})
        
        if (name === 'message') {
            setCharCount(value.length);
        }
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
                const newContact = await response.json();
                setContacts([...contacts, newContact])
                setMessage('Message sent successfully!');
                setFormData(initialFormState)
                setCharCount(0);
            } else {
                setMessage('Failed to send message.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send message.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/contact/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setContacts(contacts.filter(contact => contact.id !== id));
                setMessage('Contact deleted successfully!')
                console.log('Contact deleted:', id); // Debug log
            } else {
                setMessage('Falied to delete contact,')
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to delete contact.')
        }
    };




    return (
        <div className="container mt-5 ">
            <div className="card transparent-card border">
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

                        <div className="form-group" style={{ position: 'relative' }}>
                            <label htmlFor="message">Message:</label>
                            <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required />
                            <div style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '12px', color: '#999' }}>
                                {charCount} characters
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
            <div className="mt-5">
                <h5 className="border rounded bg-dark p-2"> NEW MESSAGES  <span className="badge badge-danger">{contacts.length}</span> </h5>
                <ul className="list-group">
                    {contacts.map(contact => (
                        <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark border">
                            <div>
                                <strong style={{ color: 'lightblue'}}>{contact.name}</strong> - <span> Has Sent You A Message On </span> {contact.date}
                                {/* <p>{contact.message}</p> */}
                            </div>
                            <button onClick={() => handleDelete(contact.id)} className="btn btn-danger">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Contact;