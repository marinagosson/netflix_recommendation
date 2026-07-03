import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';

export function encodeUser(user, context) { 
    return tf.tidy(() => { 
         const age = tf.tensor1d([
            normalize(
                user.age,
                context.minAge,
                context.maxAge
            ) * WEIGHTS.age
        ])

        const watchTime = tf.tensor1d([
            normalize(
                user.watchTimeHours,
                context.minWatchTime,
                context.maxWatchTime
            ) * WEIGHTS.watchTime
        ])

        const subscription = onHotWeighted(
            context.subscriptionsIndex[user.subscription],
            context.numSubscriptions,
            WEIGHTS.subscription
        )

        const favoriteGenre = onHotWeighted(
            context.favoriteGenresIndex[user.favoriteGenre],
            context.numFavoriteGenres,
            WEIGHTS.favoriteGenre
        )
        
        const watchedVectors = user.watchedMovies.map(movie =>
            context.movieVectorsById.get(movie.showId).vector
        )

        const watchedTensor = tf.tensor2d(watchedVectors);

        const averageMovieVector = tf.mean(
            watchedTensor,
            0
        );

        return tf.concat1d([
            age,
            watchTime,
            subscription,
            favoriteGenre,
            averageMovieVector
        ]);
    })
}

const normalize = (value, min, max) => (value - min) / ((max - min) || 1)

const WEIGHTS = {
    age: 0.5,
    subscription: 0.4,
    favoriteGenre: 0.3,
    watchTime: 0.2
}

const onHotWeighted = (index, length, weight) => {

    const tensor = tf.oneHot(index, length);

    return tensor
        .cast('float32')
        .mul(weight);
};
