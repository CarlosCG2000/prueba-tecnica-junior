
function Movie({ movie }) {
    return (
        <li className="movie">
            {/* Automaticamente los campos al tenerlo en json local */}
            < h2 > {movie.title}</h2 >
            <p> {movie.year}</p>
            <img src={movie.image} alt={movie.title} />
        </li >
    )
}

function ListOfMovies({ movies }) {
    return (
        <ul className="movies">
            {movies.map((movie) => (  // Map para recorrer el array de peliculas
                <Movie key={movie.id} movie={movie} /> // Key para identificar cada pelicula
            ))}
        </ul>
    )
}

function NoMoviesResults() {
    return <p>No se encontraron películas para su búsqueda</p>
}

// Componente Peliculas --> Devuelve el listado de peliculas o un mensaje de no resultados
export function Peliculas({ movies }) {
    const hasMovies = movies?.length > 0 // Si el Array de peliculas es mayor que 1

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}

