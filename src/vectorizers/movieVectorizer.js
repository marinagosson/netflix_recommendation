import { encodeMovie } from "../encoders/movieEncoder.js";

export function buildMoviesVector(context) { 
    console.log("codificando filmes...")
    context.movieVectors = context.movies.map(movie => { 
            return {
                id: movie.showId,
                title: movie.title,
                meta: { ...movie },
                vector: encodeMovie(movie, context).dataSync()
            } 
        })
    
    context.movieVectorsById = new Map(
        context.movieVectors.map(movie => [
            movie.id, 
            movie
        ])
    )
 }