import { Request, Response } from "express";
import { fetchRecipes, fetchRecipeById } from "../services/recipeService";

const getQueryString = (param: unknown): string | undefined => {
  if (typeof param === "string") return param;
  if (Array.isArray(param)) return param[0]?.toString();
  return undefined;
};

export const getRecipes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { ingredient, country, category } = req.query;

    let filterType: string | undefined;
    let filterValue: string | undefined;

    if (ingredient) {
      filterType = "i";
      filterValue = getQueryString(ingredient);
    } else if (country) {
      filterType = "a";
      filterValue = getQueryString(country);
    } else if (category) {
      filterType = "c";
      filterValue = getQueryString(category);
    }

    if (filterValue === undefined) {
      res.status(400).json({ message: "Invalid filter parameter" });
      return;
    }

    const recipes = await fetchRecipes(filterType, filterValue);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await fetchRecipeById(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
