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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecipeById = exports.fetchRecipes = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.BASE_URL;
const fetchRecipes = (filterType, filterValue) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `${BASE_URL}/search.php?s=`;
    if (filterType && filterValue) {
        url = `${BASE_URL}/filter.php?${filterType}=${filterValue}`;
    }
    const response = yield axios_1.default.get(url);
    return response.data.meals || [];
});
exports.fetchRecipes = fetchRecipes;
const fetchRecipeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield axios_1.default.get(`${BASE_URL}/lookup.php?i=${id}`);
    return ((_a = response.data.meals) === null || _a === void 0 ? void 0 : _a[0]) || null;
});
exports.fetchRecipeById = fetchRecipeById;
