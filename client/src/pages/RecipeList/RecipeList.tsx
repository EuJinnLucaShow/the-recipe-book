import { useEffect, useState } from "react";
import { Link } from "react-router";

import styles from "./RecipeList.module.css";
import Loader from "../../components/Loader/Loader";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/recipes`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>All Recipes</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={styles.recipes_list}>
          {recipes.map((recipe) => (
            <li key={recipe.idMeal}>
              <Link
                to={`/recipes/${recipe.idMeal}`}
                className={styles.recipe_item}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className={styles.recipe_image}
                />
                <h2 className={styles.recipe_name}>{recipe.strMeal}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
