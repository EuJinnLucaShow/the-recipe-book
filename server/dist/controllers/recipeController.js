"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipeById = exports.getRecipes = void 0;
const recipeService_1 = require("../services/recipeService");
const getQueryString = (param) => {
    var _a;
    if (typeof param === "string")
        return param;
    if (Array.isArray(param))
        return (_a = param[0]) === null || _a === void 0 ? void 0 : _a.toString();
    return undefined;
};
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ingredient, country, category } = req.query;
        let filterType;
        let filterValue;
        if (ingredient) {
            filterType = "i";
            filterValue = getQueryString(ingredient);
        }
        else if (country) {
            filterType = "a";
            filterValue = getQueryString(country);
        }
        else if (category) {
            filterType = "c";
            filterValue = getQueryString(category);
        }
        if (!filterType || !filterValue) {
            const recipes = yield (0, recipeService_1.fetchRecipes)();
            res.json(recipes);
            return;
        }
        const recipes = yield (0, recipeService_1.fetchRecipes)(filterType, filterValue);
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
});
exports.getRecipes = getRecipes;
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield (0, recipeService_1.fetchRecipeById)(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json(recipe);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getRecipeById = getRecipeById;
//# sourceMappingURL=recipeController.js.map