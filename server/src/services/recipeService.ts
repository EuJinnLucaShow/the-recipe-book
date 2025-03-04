import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;

export const fetchRecipes = async (
  filterType?: string,
  filterValue?: string
) => {
  let url = `${BASE_URL}/search.php?s=`;

  if (filterType && filterValue) {
    url = `${BASE_URL}/filter.php?${filterType}=${filterValue}`;
  }

  const response = await axios.get(url);
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};
