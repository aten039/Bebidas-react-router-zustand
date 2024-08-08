import { StateCreator } from "zustand"
import { getCategory, getRecipeDetails, getRecipes } from "../services/recipesServices"
import type { CategoryType, Drinks, Recipe, SearchFilter } from "../types"



export type RecipeSliceType = {
    categories: CategoryType[],
    drinks: Drinks[],
    selectedRecipe: Recipe,
    modal:boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drinks['idDrink']) => void,
    closeModal: ()=>void

}

export const createRecipeSlice : StateCreator<RecipeSliceType> = (set)=>({

    categories:[],
    drinks: [],
    selectedRecipe: {} as Recipe,
    modal:false,
    fetchCategories: async()=>{
        const categories = await getCategory();
        
        set({
            categories: categories.drinks
        })
    },
    searchRecipes: async (SearchFilter)=>{
        const drinks = await getRecipes(SearchFilter);
        
        set({
            drinks:drinks?.drinks
        })
    },
    selectRecipe: async(id)=>{
        const selectedRecipe = await getRecipeDetails(id)

        set({
            selectedRecipe:selectedRecipe,
            modal:true
        })
    }, 
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipe: {} as Recipe
        })
    }

})