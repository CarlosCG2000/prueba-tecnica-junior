import './App.css'

import { Peliculas } from '../components/Peliculas'
import { useMovies } from '../hooks/useMovies'
import { useSearch } from '../hooks/useSearch'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {

  //const inputRef = useRef()

  // Funciones NO CONTROLADAS que se ejecuta cuando se envía el formulario
  // 1_Usando UseRef para que el input sea controlado por React

  /*const handleSubmit = (event) => {
    event.preventDefault()
    const value = inputRef.current.value // Obtenemos el valor del input
    console.log(value)
  }*/

  // 2_Usando FormData forma Nativa para llamar a un campo en concreto
  /*const handleSubmit = (event) => {
    event.preventDefault()
    const fields = new FormData(event.target)
    const query = fields.get('query')
    console.log(query)
  }*/

  // 3_Usando fromEntries forma Nativa llamamos a todos los campos del formulario
  /*
  const handleSubmit = (event) => {
    event.preventDefault()
    const fields = Object.fromEntries(new FormData(event.target))
    console.log(fields)
  }*/

  // Usaremos mas abajo la Funciones CONTROLADAS (mientras se escribe en el input)
  //...

  // Explicacion con un ejemplo del UseRef
  /*
  let i = 0
  i++
  console.log('normal: ' + i) // siempre va a ser 1

  let j = useRef(0)
  j.current++
  console.log('current: ' + j.current) // va a ser 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  */

  console.log('render')

  // const [query, setQuery] = useState('') // Estado para controlar el input
  // const [error, setError] = useState(null) // Estado para controlar los errores
  const { search, updateSearch, error } = useSearch()

  const [sort, setSort] = useState(false) // 1. Estado para controlar el orden de las películas

  const { moviesMap, getMovies, loading, errorMessage } = useMovies({ search, sort }) // 1_Obtenemos las peliculas y la función para obtenerlas / 3. Pasamos el sort

  //==================================
  // Enviamos el formulario al dar click en el boton
  const handleSubmit = (event) => {
    event.preventDefault() // Evitamos que el formulario se envíe, ya que el comportamiento por defecto es recargar la página
    getMovies({ search }) // 2_Llamamos a la función que obtiene las películas
  }
  //==================================

  //==================================
  // Funciones CONTROLADAS mientras se escribe en el input
  const debouncedGetMovies = useCallback( // solo queremos que se renderice una vez
    debounce(search => getMovies({ search }), 500),
    [])// Debounceamos la función para que no se ejecute en cada cambio de input cada 500ms

  // Enviamos el formulario cada vez que escribamos una letra (con un tiempo de espera (debounce))
  const handleChange = (event) => {
    const newSearch = event.target.value // Nuevo: obtenemos el valor del input
    updateSearch(newSearch) // los estados son asincrono
    //getMovies({ search: newSearch })
    debouncedGetMovies(newSearch)
  }
  //==================================

  const handleSort = () => {
    setSort(!sort) // 2. Cambiamos el estado para cambiar el orden
  }

  // Facil control de errores en Funciones CONTROLADAS
  /*
  useEffect(() => {
    if (query === '') {
      setError('El campo de búsqueda no puede estar vacío')
      return
    }
    if (query.length < 3) {
      setError('El campo de búsqueda debe tener al menos 3 caracteres')
      return
    }
    if (query.match(/[^a-zA-Z0-9 ]/)) {
      setError('El campo de búsqueda solo puede contener letras y números')
      return
    }

    setError(null)
  }, [query])
  */

  return (
    <div className='page'>
      <header>
        <h1>BUSCADOR DE PELÍCULAS</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={search}
            name="search" /*ref={inputRef}*/
            type="text"
            placeholder="Avengers, The Matrix..." />
          <input type='checkbox'
            onChange={handleSort}
            checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}> {error}</p>}
      </header>

      <main>
        {/*Las peliculas*/}
        {/*<Peliculas movies={moviesMap} />*/}
        {loading ? <p>Cargando...</p> : <Peliculas movies={moviesMap} />}
      </main>
    </div >
  )
}

export default App
