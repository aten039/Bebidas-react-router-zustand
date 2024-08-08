import { z } from "zod"
import { CategoryApiResponseSchema, CategoryTypeSchema, DrinkResponse, RecipeAPIResponseSchema, SearchFilterSchema } from "../utils/recipes-schema"



export type CategoryResponseType = z.infer<typeof CategoryApiResponseSchema>

export type CategoryType = z.infer<typeof CategoryTypeSchema>

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Drinks = z.infer<typeof DrinkResponse>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>


export type Notification ={
    text: string,
    error: boolean,
    show: boolean
}