import { Route, Routes } from "react-router";
import "./App.css";
import RecipeList from "./pages/RecipeList/RecipeList";

function App() {
  return (
    <Routes>
      <Route index element={<RecipeList />} />
    </Routes>
  );
}

export default App;
