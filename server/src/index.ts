import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(
  cors({
    origin: [process.env.LOCAL_HOST_URL, process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
