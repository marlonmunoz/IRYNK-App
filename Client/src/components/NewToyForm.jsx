import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function NewToyForm({}) {

    const { ageToCategoriesMap } = useOutletContext();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        age: '',
        price: '',
        description: '',
        category: '', 
        category_id: null
       });

    const navigate = useNavigate();  // Use the navigate function from the react-router-dom
        

    const updateForm = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const newFormData = { ...prevState, [name]: value };
            if (name === 'age') {
                const categoryData = ageToCategoriesMap[value] || { category: '', category_id: null };
                newFormData.category = categoryData.category;
                newFormData.category_id = categoryData.category_id;
            }
            return newFormData;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
    
        fetch('http://localhost:5002/toys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(async response => {
          console.log('Response status:', response.status);
          return response.json().then(data => ({ status: response.status, body: data }));
        })
        .then(({ status, body }) => {
          console.log('Response body:', body);
          if (status === 200 || status === 201) {
            console.log('Success:', body);
            navigate('/home');
          } else {
            console.error('Failed to add toy:', body);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };

    const handlePatch = (id) => {
        fetch(`http://localhost:5002/toys/${id}`, {
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
        <div>
            <p>Add Your Recommended Toys To Our Database Here</p>
            <div className="form-container">
                <form onSubmit={handleSubmit}>   
                    <h3 className="h3Form"> Your Toy Recommendations 🧸 :</h3>

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
                            autoComplete="on" 
                        />
                    </div>

                    {/* IMAGE */}
                    {/* <br/><br/> */}
                    <div className="form-group">
                        <label htmlFor="image">Toy URL Image: </label>
                        <input 
                            className="my-inputs" 
                            type="text" 
                            id="image" 
                            name="image" 
                            value= {formData.image} 
                            onChange={updateForm} 
                            autoComplete="on" 
                        />
                    </div>

                    {/* AGE */}
                    {/* <br/><br/> */}
                    <div className="form-group">
                        <label htmlFor="age">Toy By Age</label>
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
                    {/* <br/><br/> */}
                    <div className="form-group">
                        <label htmlFor="price">Toy Price: </label>
                        <input 
                            className="my-inputs" 
                            type="text" 
                            id="price" 
                            name="price" 
                            value= {formData.price} 
                            onChange={updateForm} 
                            autoComplete="on" 
                        />
                    </div>

                    {/* DESCRIPTION */}
                    {/* <br/><br/> */}
                    <div className="form-group">
                        <label htmlFor="description">Toy Description: </label>
                        <input 
                            className="my-inputs" 
                            type="text" 
                            id="description" 
                            name="description" 
                            value= {formData.description} 
                            onChange={updateForm}
                            autoComplete="on" 
                            
                        />
                    </div>

                    {/*CATEGORY*/}
                    <div className="form-group">
                        <label htmlFor="category">Category: </label>
                        <input 
                            className="my-inputs" 
                            type="text" 
                            id="category" 
                            name="category" 
                            value={formData.category} 
                            readOnly 
                        />
                    </div>
                    <br />
                    <button className="add-to-list" type="submit">Add To List</button>
                    {/* <button className="add-to-list" type="submit" onClick={() => handlePatch(1)}>Update Toy</button> Example button to trigger PATCH */}
                </form>
            </div>
        </div>
    );
}
export default NewToyForm;

















