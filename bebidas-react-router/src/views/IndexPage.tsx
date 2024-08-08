import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinksCard from "../components/DrinksCard";

export default function IndexPage() {

  const drinks = useAppStore((state)=> state.drinks);
  const hasDrinks = useMemo(()=> drinks.length>0, [drinks])


  return (
    <>

      <h1 className="text-6xl font-extrabold">Recetas</h1>

      {hasDrinks?(

        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 my-10">
          {drinks.map((drink)=>(
            <DrinksCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>

        ):(
        <>
          <p className=" mt-2 text-2xl">No hay resultados, utiliza el formulario para buscar recetas</p>  
        </>
        )
      }
      
    </>
  )
}
