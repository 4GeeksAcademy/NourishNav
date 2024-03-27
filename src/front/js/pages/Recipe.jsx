import React, { useEffect } from "react";
import { recipe_list } from "../component/recipe_data";
import "../../styles/recipe.css";

const Recipe = () => {
  useEffect(() => {
    console.log(recipe_list);
  }, []);
  const addFavorite = (recipe) => {
    console.log("Add to favorites:", recipe.title);
    // Implement add to favorites functionality here
  };

  return (
    <div className="container">
      <h1>Recipes</h1>
      <div className="row">
        {recipe_list.map((recipe) => (
          <div key={recipe.id} className="col-md-4">
            <div className="card">
              <img
                src={recipe.img_url}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.desc}</p>
                <button
                  className="btn btn-success"
                  onClick={() => addFavorite(recipe)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;

// import React from "react";
// import "../../styles/recipe.css";
// import foodImage2 from "../../img/foodImage2.jpg";
// import buddhaBowl from "../../img/buddhaBowl.jpg";
// import breakfast1 from "../../img/breakfast1.jpg";
// import breakfast2 from "../../img/breakfast2.jpg";
// import breakfast3 from "../../img/breakfast3.jpg";
// import veggieWrap from "../../img/veggieWrap.jpeg";
// import lunch3 from "../../img/lunch3.jpeg";

// const addFavorite = (recipe) => {
//   setFavorites((prevFavorites) => {
//     // Check if the recipe is already in favorites
//     const isFavorite = prevFavorites.some((fav) => fav.id === recipe.id);
//     if (!isFavorite) {
//       return [...prevFavorites, recipe];
//     }
//     return prevFavorites;
//   });
// };

// const Recipe = () => {
//   return (
//     <div
//       className="hero-section"
//       style={{ backgroundColor: '#ffffff' }}
//     >
//       <div className="container py-5">
//         <h1 className="text-center text-white mb-5">Nutrition Made Easy</h1>
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card mb-4">
//               <div className="card-body">
//                 <h5 className="card-title text-white">Recipe of the Day</h5>
//                 <p className="card-text text-white">
//                   Enjoy our Healthy Salmon Bowl: grilled salmon, quinoa, string
//                   beans, fresh tomatoes, and zesty citrus dressing. Packed with
//                   omega-3s, protein, and vitamins, it's a nutritious delight!
//                 </p>
//                 <a href="#" className="btn btn-success d-block mx-auto">
//                   View Recipe
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="text-center mb-5">
//           <h4 className="mb-4">Find Your Plan</h4>
//           <button type="button" className="btn btn-success btn-lg">
//             Upgrade Now
//           </button>
//         </div>
//         <div className="recipes-section">
//           <h3 className="text-center mb-4">
//             Try one of our Delicious and Balanced Recipes
//           </h3>
//           <div className="row row-cols-1 row-cols-md-3 g-4">

//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={breakfast1}
//                   className="card-img-top"
//                   alt="Breakfast 2"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Mediterranean Salad</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     Fresh and Flavorful
//                   </h6>
//                   <p className="card-text">
//                     Indulge in the vibrant tastes of the Mediterranean with our
//                     refreshing salad. Bursting with fresh veggies, olives, feta
//                     cheese, and a tangy vinaigrette.
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
//             </div>
//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={breakfast3}
//                   className="card-img-top"
//                   alt="Breakfast 3"
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
//             </div>
//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={buddhaBowl}
//                   className="card-img-top"
//                   alt="Lunch 1"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Buddha Bowl</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     Delicious and Nutritious
//                   </h6>
//                   <p className="card-text">
//                     Discover the perfect balance of flavors and nutrients in our
//                     Buddha Bowl. Packed with protein, fiber, and essential
//                     vitamins.
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
//             </div>
//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={veggieWrap}
//                   className="card-img-top"
//                   alt="Lunch 2"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Mediterranean Salad</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     Fresh and Flavorful
//                   </h6>
//                   <p className="card-text">
//                     Indulge in the vibrant tastes of the Mediterranean with our
//                     refreshing salad. Bursting with fresh veggies, olives, feta
//                     cheese, and a tangy vinaigrette.
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
//             </div>
//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={lunch3}
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
//             </div>
//             <div className="col">
//               <div className="card h-100 recipe-card">
//                 <img
//                   src={lunch3}
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
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recipe;
