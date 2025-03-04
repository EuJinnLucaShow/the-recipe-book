import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import styles from "./RecipeInfo.module.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  strCategory: string;
  [key: string]: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function RecipeInfo() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const response = await fetch(`${API_URL}/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      };
      fetchRecipe();
    }
  }, [id]);

  useEffect(() => {
    if (recipe) {
      const fetchRelatedRecipes = async () => {
        const response = await fetch(
          `${API_URL}/api/recipes?category=${recipe.strCategory}`
        );
        const data = await response.json();
        setRelatedRecipes(data);
      };
      fetchRelatedRecipes();
    }
  }, [recipe]);

  if (!recipe) return <Loader />;

  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((key) => recipe[key] as string);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar_wrapper}>
        <div className={styles.sidebar}>
          <h3>List of the current recipe category</h3>
          <ul className={styles.related_recipes}>
            {relatedRecipes.map((relatedRecipe) => (
              <li
                key={relatedRecipe.idMeal}
                className={styles.related_recipe_item}
              >
                <Link
                  to={`/recipes/${relatedRecipe.idMeal}`}
                  className={styles.related_recipe_link}
                >
                  {relatedRecipe.strMeal}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.recipe_wrapper}>
        <div className={styles.recipe_header}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className={styles.recipe_image}
          />
          <div>
            <h1 className={styles.recipe_name}>{recipe.strMeal}</h1>
            <p>
              <Link
                to={`/recipes?country=${recipe.strArea}`}
                className={styles.recipe_country}
              >
                {recipe.strArea}
              </Link>
            </p>
            <h3>Ingredients</h3>
            <ul className={styles.ingredients_list}>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  <Link
                    to={`/recipes?ingredient=${ingredient}`}
                    className={styles.ingredient}
                  >
                    {ingredient}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Instructions</h2>
        <p className={styles.recipe_instructions}>{recipe.strInstructions}</p>
      </div>
    </div>
  );
}
