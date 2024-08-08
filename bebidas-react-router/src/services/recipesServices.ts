import axios from "axios"
import { CategoryApiResponseSchema, DrinksApiResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema";
import { Drinks, SearchFilter } from "../types";

export async function getCategory() {

    const urlCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    
    try {

        const {data} = await axios(urlCategories);
        
        const result = CategoryApiResponseSchema.safeParse(data);
        
        if(result.success){
            return result.data;
        }else{
            throw new Error;
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error');
    }
}

export async function getRecipes(filter: SearchFilter) {
    const urlRecipes = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`;
   
    const {data} = await axios(urlRecipes);
    const result = DrinksApiResponse.safeParse(data);
    
    if(result.success){
        return result.data;
    }
}

export async function getRecipeDetails(id:Drinks['idDrink']) {

    const urlDetails =`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const {data} = await axios(urlDetails);

    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);
    console.log(result)
    if(result.success){
        return result.data
    }

}