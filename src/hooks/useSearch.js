import { useEffect, useState, useRef } from 'react'

export function useSearch() {
    const [search, updateSearch] = useState('') // Estado para controlar el input
    const [error, setError] = useState(null) // Estado para controlar los errores

    const isFirstInput = useRef(true) // damos valor a la referencia true

    useEffect(() => {
        //si es cuando arranca la app no nos fijamos en eliknput que estara vacio
        if (isFirstInput.current) { // Si es el primer input no hacemos nada
            isFirstInput.current = false // Cambiamos el valor de la referencia
            return
        }

        if (search === '') {
            setError('El campo de búsqueda no puede estar vacío')
            return
        }
        if (search.length < 3) {
            setError('El campo de búsqueda debe tener al menos 3 caracteres')
            return
        }
        if (search.match(/[^a-zA-Z0-9 ]/)) {
            setError('El campo de búsqueda solo puede contener letras y números')
            return
        }

        setError(null)
    }, [search])

    return { search, updateSearch, error }
}
