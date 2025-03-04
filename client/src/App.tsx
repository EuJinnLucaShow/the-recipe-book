import { Route, Routes } from "react-router";
import "./App.css";
import RecipeList from "./pages/RecipeList/RecipeList";
import Layout from "./components/Layout/Layout";
import RecipeInfo from "./pages/RecipeInfo/RecipeInfo";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
