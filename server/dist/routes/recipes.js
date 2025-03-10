"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipeController_1 = require("../controllers/recipeController");
const router = (0, express_1.Router)();
router.get("/", recipeController_1.getRecipes);
router.get("/:id", recipeController_1.getRecipeById);
exports.default = router;
//# sourceMappingURL=recipes.js.map