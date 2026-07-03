import { randomSample } from "../utils/random.js";

export function createTrainingData(context) {
    console.log("criando dados de treinamento...")
    const inputs = []; 
    const labels = [];

    context.usersWithHistory
        .slice(0, 10) 
        .forEach(user => { 
            const userVector = context.userVectorsById.get(user.id).vector

            const watchedIds = new Set(
                user.watchedMovies.map(movie => movie.showId)
            );  

            const unwatchedMovies = context.movies.filter(movie =>
                !watchedIds.has(movie.showId)
            );

            const negativeMovies = randomSample(
                unwatchedMovies,
                user.watchedMovies.length
            ); 

            user.watchedMovies.forEach(movie => { 
                const movieVector = context.movieVectorsById.get(movie.showId).vector

                inputs.push([
                    ...userVector,
                    ...movieVector
                ])

                labels.push(1)
            })

            negativeMovies.forEach(movie => {

                const movieVector = context.movieVectorsById
                    .get(movie.showId)
                    .vector;

                inputs.push([
                    ...userVector,
                    ...movieVector
                ]);

                labels.push(0);

            });
    
    });

    return {
        xs: tf.tensor2d(inputs),
        ys: tf.tensor2d(labels, [labels.length, 1]),
        inputDimension: inputs[0].length
    }

}