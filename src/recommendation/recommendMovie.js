import { searchMovieVectors } from "../services/movieVectorApi.js";
import { averageVector } from "../vectorizers/averageVector.js";

export async function recommendMovies(
    userId,
    model,
    context,
    limit = 10) { 
    console.log("recomendando filmes...")
    // obter o usuario
    const user = context.usersWithHistoryById.get(userId)

    if (!user) {
        console.log("Usuário não encontrado");
        return [];
    }

    if (!user.watchedMovies.length) {
        console.log("Usuário sem histórico");
        return [];
    }
    
    const userVector = context.userVectorsById.get(user.id).vector

    if (!userVector) return []

    const watchedVectors = user.watchedMovies
        .map(movie =>
            context.movieVectorsById.get(movie.showId)?.vector
        )
        .filter(Boolean)
    
    if (!watchedVectors.length) {
       return [];
    }
    
    const preferenceVector = averageVector(watchedVectors)

    const searchResult = await searchMovieVectors(Array.from(preferenceVector), 200);
    
    console.log(searchResult); 
    
    const nearestMovies = searchResult.results ?? [];

    if (!nearestMovies.length) {
        return [];
    } 
    
    const candidates = nearestMovies
        .map(item => {

            const movie = context.movieVectorsById.get(item.id);

            if (!movie) {
                return null;
            }

            return {
                result: item,
                movie
            };

        })
        .filter(Boolean);
    
    const predictionInputs = candidates.map(candidate => [
        ...userVector,
        ...candidate.movie.vector
    ]); 
    
    const xs = tf.tensor2d(predictionInputs);
    let predictions;
    try {

        predictions = model.predict(xs);

        if (!(predictions instanceof tf.Tensor)) {
            throw new Error("Predição inválida.");
        }

        const scores = predictions.dataSync()  

        const recommendations = candidates.map((candidate, index) => ({
            ...candidate.result,
            score: scores[index]
        }));

        recommendations.sort(
            (a, b) => b.score - a.score
        );

        return recommendations.slice(0, limit);

    } finally {
        xs.dispose()
        predictions?.dispose()
    }

} 