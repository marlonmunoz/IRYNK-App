import { useNavigate } from "react-router-dom";
import { useState } from "react";

 function NewToyForm() {
     const [formData, setFormData] = useState({
         name: '',
         image: '',
         age: '',
         price: '',
         description: '',
         category_id: '' // Ensure category is part of the form data
        });

    const navigate = useNavigate();  // Use the navigate function from the react-router-dom
        
    const updateForm = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'category_id' ? parseInt(value) : value // Parse the category value as an integer
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/toys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate('/home');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    };

    const handlePatch = (id) => {
        fetch(`http://localhost:5001/toys/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate ('/home');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>   
                <h3> Your Toy Recommendations 🧸 :</h3>

                {/* NAME */}
                <div className="form-group">
                    <label htmlFor="name">Toy Name: </label>
                    <input 
                        className="my-inputs" 
                        type="text" 
                        id="name" 
                        name="name" 
                        value= {formData.name} 
                        onChange={updateForm} 
                    />
                </div>

                {/* IMAGE */}
                <br/><br/>
                <div className="form-group">
                    <label htmlFor="image">Toy URL Image: </label>
                    <input 
                        className="my-inputs" 
                        type="text" 
                        id="image" 
                        name="image" 
                        value= {formData.image} 
                        onChange={updateForm} 
                    />
                </div>

                {/* AGE */}
                <br/><br/>
                <div className="form-group">
                    <label htmlFor="age"></label>
                    <select 
                        className="my-inputs" 
                        type="text" 
                        id="age" 
                        name="age" 
                        value= {formData.age} 
                        onChange={updateForm} 
                    >
                        <option value="">SELECT MONTH</option>
                        <option value="0-2 months">0-2 months</option>
                        <option value="3-4 months">3-4 months</option>
                        <option value="5-6 months">5-6 months</option>
                        <option value="7-8 months">7-8 months</option>
                        <option value="9-10 months">9-10 months</option>
                        <option value="11-12 months">11-12 months</option>
                        <option value="13-15 months">13-15 months</option>
                        <option value="16-18 months">16-18 months</option>
                        <option value="19-21 months">19-21 months</option>
                        <option value="22-24 months">22-24 months</option>
                    </select>
                </div>
               
                {/* PRICE */} 
                <br/><br/>
                <div className="form-group">
                    <label htmlFor="price">Toy Price: </label>
                    <input 
                        className="my-inputs" 
                        type="text" 
                        id="price" 
                        name="price" 
                        value= {formData.price} 
                        onChange={updateForm} 
                    />
                </div>

                {/* DESCRIPTION */}
                <br/><br/>
                <div className="form-group">
                    <label htmlFor="description">Toy Description: 
                    <input 
                        className="my-inputs" 
                        type="text" 
                        id="description" 
                        name="description" 
                        value= {formData.description} 
                        onChange={updateForm} />
                    </label>
                </div>

                {/*CATEGORY*/}
                <div className="form-group"> 
                    <label htmlFor="category_id"> Category ID:
                    <select 
                        className="my-inputs"
                        id="category_id" 
                        name="category_id" 
                        value= {formData.category_id} 
                        onChange={updateForm} 
                    >
                            <option value="">ADD CATEGORY</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option valie="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                    </select>
                    </label>
                </div>
                <button className="add-to-list" type="submit">Add To List</button>
                {/* <button className="add-to-list" type="submit" onClick={() => handlePatch(1)}>Update Toy</button> Example button to trigger PATCH */}

            </form>
        </div>
        
    )
}
export default NewToyForm;

















