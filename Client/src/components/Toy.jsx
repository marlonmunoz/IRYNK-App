import LikeButton from "./LikeButton";

function Toy({ toy, deleteToy, nameCategories, ageToCategoryMap } ) {
  const categoryId = ageToCategoryMap[toy.age];
  const categoryName = categoryId ? nameCategories[categoryId.toString()] : "Unknown Category";

  // console.log("<<==== Toy Component Rendered ====>>");
  // console.log("toy:", toy);
  // console.log("ageToCategoryMap:", ageToCategoryMap);
  // console.log("categoryId:", categoryId);
  // console.log("nameCategories:", nameCategories);
  // console.log("categoryName:", categoryName);

    return (
      <div className="container">
        <div className="toy">
          <img className="toy-image" src={toy.image} alt={toy.name} />
          <div className="toy-details">
              <h2>{toy.name}</h2>
              <p id="description">{toy.description}</p>
              <p id="toy-price">$ {toy.price}</p>
              <h3>Ages: {toy.age}</h3>
              <p id="category_id"> <span>CATEGORY:</span> {categoryName}</p>

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