import { StateCreator } from "zustand";
import { Recipe } from "../types";
import type { Notification } from "../types";


export type NotificationSliceType = {
    
    
}
export type FavoriteSliceType = {
    favorites: Recipe[],
    notification: Notification,
    handleClickFavorite: (recipe: Recipe) => void,
    favoritesExist: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>)=>void,
    hideNotification: () => void
}

export const createFavoriteSlice: StateCreator<FavoriteSliceType> = (set, get)=>({
    favorites: [] ,
    notification: {
        text: '',
        error: false,
        show: false
    },
    handleClickFavorite : (recipe)=>{
        if(get().favoritesExist(recipe.idDrink)){
            set((state)=>({
                favorites: state.favorites.filter((fav)=> fav.idDrink !== recipe.idDrink)
            }))
            get().showNotification({text: 'Se ha eliminado correctamente',error:false})
        }else{
            set((state)=>({
                favorites: [...state.favorites, recipe]
            }))
            get().showNotification({text: 'Se ha agregado correctamente',error:false})
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoritesExist : (id)=>{
        
        return get().favorites.some((fav)=> fav.idDrink === id)
    },
    loadFromStorage : ()=>{
        const favoriteStorage = localStorage.getItem('favorites');

        if(favoriteStorage){
            set({
                favorites: JSON.parse(favoriteStorage)
            })
        }

    },
    showNotification:(payload)=>{
        set({
            notification:{
                text: payload.text,
                error: payload.error,
                show:true
            }
        })
        setTimeout(()=>{
            get().hideNotification()
        }, 5000)
    },
    hideNotification: ()=>{
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})