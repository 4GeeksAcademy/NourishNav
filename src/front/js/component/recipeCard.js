import React, { useState, useEffect } from "react";

export default function RecipeCard({ id }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset loading state
    setLoading(true);
    setError(null);

    // Fetch recipe data
    fetch(`https://your-api-endpoint/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render recipe card
  return (
    <div className="card h-100 recipe-card">
      <img
        src={recipe.img_url}
        className="card-img-top"
        alt="Recipe Image"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{recipe.subtitle}</h6>
        <p className="card-text">{recipe.desc}</p>
        {/* 'addFavorite' function is defined elsewhere */}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => addFavorite(recipe)}
        >
          <i className="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

// import React from 'react'

// export default function recipeCard(id) {
//     const [reciepe, setRecipe] = useState({})
//     useEffect(()= > {
//         // here you will make a fetch request passing in the id to get the recipe you need
//         // set recipe to api results
//     })
//   return (
//     <div className="card h-100 recipe-card">
//                 <img
//                   src={recipe.img_url}
//                   className="card-img-top"
//                   alt="Lunch 3"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Green Smoothie</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     Energy Booster
//                   </h6>
//                   <p className="card-text">
//                     Revitalize your day with our Green Smoothie, packed with
//                     leafy greens, fruits, and superfoods. It's the perfect way
//                     to fuel your body and mind!
//                   </p>
//                   <button
//                     type="button"
//                     className="btn btn-success"
//                     onClick={() => addFavorite(recipe)}
//                   >
//                     <i className="fa-regular fa-heart"></i>
//                   </button>
//                 </div>
//               </div>
//   )
// }
