import LikeButton from "./LikeButton";

function Toy({ toy, deleteToy, nameCategories, ageToCategoryMap } ) {
  const categoryId = ageToCategoryMap[toy.age];
  const categoryName = categoryId ? nameCategories[categoryId.toString()] : "Unknown Category";

    return (
      <div className="container">
        <div className="toy">
          <img className="toy-image" src={toy.image} alt={toy.name} />
          <div className="toy-details">
              <h3><span className="badge badge-warning toy-name">{toy.name}</span></h3>
              <p id="description">{toy.description}</p>
              <p id="toy-price">$ {toy.price}</p>
              <h6>Ages: {toy.age}</h6>
              <p id="category_id"> <span>CATEGORY:</span> {categoryName} </p>

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