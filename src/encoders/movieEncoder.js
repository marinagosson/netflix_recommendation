import 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';

export function encodeMovie(movie, context) {

    const year = tf.tensor1d([
        normalize(
            movie.year,
            context.minYear,
            context.maxYear
        ) * WEIGHTS.year
    ])

    const duration = tf.tensor1d([
        normalize(
            parseInt(movie.duration),
            context.minDuration,
            context.maxDuration
        ) * WEIGHTS.duration
    ])

    const typeIndex = context.typesIndex[movie.type];
    const ratingIndex = context.ratingsIndex[movie.rating];
    
    const type = onHotWeighted(
        typeIndex,
        context.numTypes,
        WEIGHTS.type
    )

    const raiting = onHotWeighted(
        ratingIndex,
        context.numRatings,
        WEIGHTS.rating
    )

    const genres = multiHotEncodeGenres(
        movie.listedIn,
        context
    );

    return tf.concat1d([
        year,
        duration,
        type,
        raiting,
        genres
    ]);

}

const normalize = (value, min, max) => (value - min) / ((max - min) || 1)

const WEIGHTS = {
    year: 0.5,
    duration: 0.4,
    type: 0.3, 
    rating: 0.2,
    genres: 0.1 
}

const onHotWeighted = (index, length, weight) => {

    const tensor = tf.oneHot(index, length);

    return tensor
        .cast('float32')
        .mul(weight);
};

function multiHotEncodeGenres(genres, context) {

    const vector = new Array(context.numGenres).fill(0);

    const movieGenres = genres
        .split(",")
        .map(genre => genre.trim());

    for (const genre of movieGenres) {

        const index = context.genresIndex[genre];

        if (index !== undefined) {
            vector[index] = WEIGHTS.genres;
        }

    }

    return tf.tensor1d(vector);

}