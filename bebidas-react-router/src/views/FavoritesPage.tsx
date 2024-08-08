import { useMemo } from "react";
import DrinksCard from "../components/DrinksCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore((state)=>state.favorites);
  const hasFavorites = useMemo(()=> favorites.length , [favorites])
  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites?(
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10">
        {favorites.map((fav)=>(
          <DrinksCard
            key={fav.idDrink}
            drink={fav}
          />
        ))}
        </div>
      ):(
        <p className=" text-center mt-10 text-2xl">Los favoritos se mostraran aqui.</p>
      )}
      
    </>
  )
}
