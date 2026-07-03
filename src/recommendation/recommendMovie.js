export function recommendMovies(
    userId,
    model,
    context,
    limit = 10) { 
    console.log("recomendando filmes...")
    
    // obter o usuario
    const user = context.usersWithHistoryById.get(userId)

    // separar os id dos filmes que ele ja assistiu
    console.log("Quantidade de filmes assistidos:", user.watchedMovies.length)
    
    if (!user.watchedMovies.length) return [];

    const watchedIds = new Set(
        user.watchedMovies.map(movie => movie.showId)
    )
 
    // retorna a lista de filmes nao assistidos
    const candidateMovies = context.movies.slice(0, 100).filter(
        movie => !watchedIds.has(movie.showId)
    )

    const userVector = context.userVectorsById.get(user.id).vector

    const predictionInputs = candidateMovies.map(movie => { 
        const movieVector = context.movieVectorsById.get(movie.showId).vector

        return [ 
            ...userVector,
            ...movieVector
        ] 
    })

    const xs = tf.tensor2d(predictionInputs)

    const predictions = model.predict(xs)

    const scores = predictions.dataSync();

    const recommendations = candidateMovies.map((item, index) => {
        return {
            ...item,
            score: scores[index]
        }
    })
    
    recommendations.sort(
        (a, b) => b.score - a.score
    );


    xs.dispose();
    predictions.dispose();

    return recommendations.slice(0, limit);

} 