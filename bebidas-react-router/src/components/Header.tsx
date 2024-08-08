import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation} from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore';


export default function Header() {
  
  const [filter, setFilter] = useState({
    ingredient: '',
    category: ''
  })

  const {pathname} = useLocation();

  const isHome = useMemo(()=> pathname === '/' , [pathname]);

  const fetchCatedories = useAppStore((state)=> state.fetchCategories)
  const categories = useAppStore((state)=> state.categories)
  const searchRecipes = useAppStore((state)=> state.searchRecipes)
  const showNotification = useAppStore((state)=> state.showNotification)
  
  useEffect(()=>{
    fetchCatedories();
  }, []);

  const hangleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    e.preventDefault();

    setFilter({
      ...filter,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    //validar
    if(Object.values(filter).includes('')){
      showNotification({text: 'Los campos son obligatorios', error:true});
      return
    }
    // guardar en el store
    searchRecipes(filter);

    //
    setFilter({
      ingredient: '',
      category: ''
    })
  }

  return (
    <header className={ isHome? " bg-header bg-no-repeat bg-cover bg-center": 'bg-slate-800'}>

        <div className="mx-auto container px-5 py-6">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="Logo"/>
                </div>
                <nav className=' flex gap-4'>

                  <NavLink to={'/'}
                    className={ ({isActive})=> 
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                    }
                  >Inicio</NavLink>

                  <NavLink to={'/favoritos'}
                    className={({isActive})=>
                      isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                  }
                  >favoritos</NavLink>

                </nav>
            </div>

            {isHome && (
              <form
                className='md:w-1/2 2xl:w-1/3 bg-orange-500 my-20 p-10 rounded-lg shadow space-y-6' 
                onSubmit={handleSubmit}
              >
                <div className=' space-y-4 '>
                  <label htmlFor='ingredient'
                    className='block  uppercase font-extrabold text-lg'
                  >Ingredientes</label>
                  <input
                    id='ingredient'
                    name='ingredient'
                    type='text'
                    placeholder='Introduce el ingrediente'
                    className='p-3 w-full rounded-lg focus:outline-none'
                    value={filter.ingredient}
                    onChange={hangleChange}
                  />
                </div>

                <div className=' space-y-4 '>
                  <label htmlFor='category'
                    className='block uppercase font-extrabold text-lg'
                  >Categoria</label>
                  <select
                    id='category'
                    name='category'
                    className='p-3 w-full rounded-lg focus:outline-none'
                    value={filter.category}
                    onChange={hangleChange}
                  >

                    <option value={''}>---Seleccione---</option>

                    {categories.map((cat)=>(
                      <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
                    ))}

                  </select>
                </div>

                <input
                  type='submit'
                  value='Buscar Receta'
                  className='cursor-pointer bg-orange-700 hover:bg-orange-800
                  text-white p-3 font-extrabold w-full rounded-lg transition-all'
                />

              </form>

            )}

        </div>

    </header>
  )
}
