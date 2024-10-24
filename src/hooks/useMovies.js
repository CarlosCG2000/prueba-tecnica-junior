
// import withResults from '../mocks/result.json'
// import withoutResuelts from '../mocks/no-result.json'
import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) { //3. les pasamos por props la busqueda

    const [movies, setMovies] = useState([]) // 1. creamos el estado
    const [error, setError] = useState(null) // 2. creamos el estado
    const [loading, setLoading] = useState(false) // 3. creamos el estado
    const previousSearch = useRef(null) // 4. creamos el estado

    // CON USE MEMO
    // const getMovies = useMemo(() => {
    //     return async ({ search }) => {

    //         if (search === previousSearch.current) return // 5. si la busqueda es igual a la anterior no hacemos nada

    //         try {
    //             setLoading(true)
    //             setError(null)
    //             previousSearch.current = search // 6. guardamos la busqueda actual
    //             const newMovies = await searchMovies({ search }) // fetch de las peliculas
    //             setMovies(newMovies)
    //         } catch (e) {
    //             setError(e.message)
    //         } finally { // siempre se ejecuta de error o no
    //             setLoading(false)
    //         }
    //     }
    // }, [search]) // 6. solo cuando cambie la busqueda)

    // CON USE CALLBACK

    const getMovies = useCallback(
        async ({ search }) => {

            if (search === previousSearch.current) return // 5. si la busqueda es igual a la anterior no hacemos nada

            try {
                setLoading(true)
                setError(null)
                previousSearch.current = search // 6. guardamos la busqueda actual
                const newMovies = await searchMovies({ search }) // fetch de las peliculas
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally { // siempre se ejecuta de error o no
                setLoading(false)
            }
        }, [search]) // 6. solo cuando cambie la busqueda)


    // 7. solo hacer el sort cuando cambie cierta informacion
    const sortMovies = useMemo(() => {
        console.log('useMemo-sortMovies')
        if (!movies) return;
        return sort ?
            [...movies].sort((a, b) => a.title.localeCompare(b.title)) // 7. ordenamos las peliculas por titulo, el localeCompare es para que ordene bien las letras con acentos
            : movies
    }, [sort, movies]) // cuando cambie sort o movies, me vuelves a ejecutar el sort



    return { moviesMap: sortMovies, getMovies, loading, error } // 4. devolvemos ahora tb getMovies
}

