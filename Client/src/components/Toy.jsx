import LikeButton from "./LikeButton";

function Toy({ toy, deleteToy }) {


    return (
      <div className="container">
        <div className="toy">
          <img className="toy-image" src={toy.image} alt={toy.name} />
          <div className="toy-details">
              <h2>{toy.name}</h2>
              <p id="description">{toy.description}</p>
              <p id="toy-price">$ {toy.price}</p>
              <h3>Ages: {toy.age}</h3>
              <p id="category_id"> <span>CATEGORY:</span> {toy.category}</p>

              <div className="my-buttons">
                <button className="delete-button" onClick={deleteToy}>🗑️ Delete Toy</button>
                  <LikeButton />
              </div>

           </div>

        </div>
      </div>
    );
  }  

export default Toy;