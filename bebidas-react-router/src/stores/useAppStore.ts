import { create } from "zustand";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteSlice";



export const useAppStore = create<RecipeSliceType & FavoriteSliceType >()(devtools((...a)=>({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a)
})))
