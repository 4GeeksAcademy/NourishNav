import React from 'react'


export default function favCard(id) {
    const [reciepe, setRecipe] = useState({})
    useEffect(()= > {
        // here you will make a fetch request passing in the id to get the recipe you need
        // set recipe to api results
    })
  return (
    <div className="card h-100 recipe-card">
                <img
                  src={recipe.img_url}
                  className="card-img-top"
                  alt="Lunch 3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Green Smoothie</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Energy Booster
                  </h6>
                  <p className="card-text">
                    Revitalize your day with our Green Smoothie, packed with
                    leafy greens, fruits, and superfoods. It's the perfect way
                    to fuel your body and mind!
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
  )
}
