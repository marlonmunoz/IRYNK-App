import React from "react";
function About () {
    return (
        <div className="container mt-5 mission-container">
            <div className="card">
                <div className="card-body text-dark">
                    <h3 className="card-title h3Form">Mission</h3>
                    <p className="card-text border rounded">
                        {/* <em> */}
                        The mission, is to help new or first time parents choose a toy according to the baby's age
                        and development stage. I believe that toys are essential not only for their entertainment, but for 
                        the development of their beautilful brain. Empowering every parent with knowledege in their baby's 
                        early stages of life, could make a tremendous impact in their cognitive development in their future ahead. 
                        <span className="badge badge-success text-white">👶 IRYNK-App 🧸</span> was developed by a first-time parent for all parents.
                        {/* </em> */}
                    </p>
                    <h5 className="card-title border rounded text-white bg-dark">Links</h5>
                    <div className="row">
                    <div className="col-md-6 mb-2">
                        <a href="https://lovevery.com/" className="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">lovevery.com</a>
                    </div>
                    <div className="col-md-6 mb-2">
                        <a href="https://www.manhattantoy.com/" className="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">manhattantoy.com</a>
                    </div>
                    <div className="col-md-6 mb-2">
                        <a href="https://www.marlonshade.com/" className="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">Marlon Shade</a>
                    </div>
                    <div className="col-md-6 mb-2">
                        <a href="https://www.linkedin.com/in/marlonrmunoz/" className="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">LinkeIn</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;