const API_KEY = 'PON TU API KEY AQUI (al iniciar sesion en https://www.omdbapi.com/)'

export const searchMovies = async ({ search }) => {

  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    // se mapea para no entrar en el contrato del json de la API
    return movies?.map(movie => ({ // Array de peliculas estan en el campo Search
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))

  } catch (e) {
    throw new Error('Error searching movies')
  }
}
