export function makeContext(movies, users, history) {
    console.log("criando contexto...")
    const moviesById = new Map()
    const usersById = new Map()
    const historyByUser = new Map()
    const historyByMovie = new Map()
    const usersWithHistory = []

    for (const movie of movies) {
        moviesById.set(movie.showId, movie);
    }

    for (const user of users) {
        usersById.set(user.id, user);
    }

    for (const item of history) {

        if (!historyByUser.has(item.userId)) {
            historyByUser.set(item.userId, []);
        }

        historyByUser.get(item.userId).push(item.showId);

        if (!historyByMovie.has(item.showId)) {
            historyByMovie.set(item.showId, []);
        }

        historyByMovie.get(item.showId).push(item.userId);
    }

    for (const user of users) {

        const watchedMovieIds = historyByUser.get(user.id) || [];

        const watchedMovies = watchedMovieIds
            .map(movieId => moviesById.get(movieId))
            .filter(Boolean);

        usersWithHistory.push({
            ...user,
            watchedMovies
        });

    }

    const usersWithHistoryById = new Map(
        usersWithHistory.map(user => [
            user.id,
            user
        ])
    )

    // movie
    const years = movies.map(movie => movie.year)

    const durations = movies
        .map(movie => parseInt(movie.duration))
        .filter(value => !Number.isNaN(value))

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);

    const types = [...new Set(movies.map(movie => movie.type))];
    
    const ratings = [...new Set(movies.map(movie => movie.rating))];

    const genres = [
        ...new Set(
            movies.flatMap(movie =>
                movie.listedIn
                    .split(",")
                    .map(g => g.trim())
            )
        )
    ];

    const typesIndex = Object.fromEntries(
        types.map((type, index) => [type, index])
    );

    const ratingsIndex = Object.fromEntries(
        ratings.map((rating, index) => [rating, index])
    );

    const genresIndex = Object.fromEntries(
        genres.map((genre, index) => [genre, index])
    );

    // user
    const ages = users.map(user => user.age)

    const watchTimes = users.map(user => user.watchTimeHours)

    const subscriptions = [...new Set(users.map(user => user.subscription))]

    const favoriteGenres = [...new Set(users.map(user => user.favoriteGenre))]

    const minWatchTime = Math.min(...watchTimes)
    const maxWatchTime = Math.max(...watchTimes)

    const minAge = Math.min(...ages)
    const maxAge = Math.max(...ages)

    const subscriptionsIndex = Object.fromEntries(
        subscriptions.map((subscription, index) => [subscription, index])
    );

    const favoriteGenresIndex = Object.fromEntries(
        favoriteGenres.map((genre, index) => [genre, index])
    );

    return {
        movies,
        users,
        history,

        moviesById,
        usersById,

        historyByUser,
        historyByMovie,

        usersWithHistory,
        usersWithHistoryById,

        typesIndex,
        ratingsIndex,
        genresIndex,

        numTypes: types.length,
        numRatings: ratings.length,
        numGenres: genres.length,

        minYear,
        maxYear,

        minDuration,
        maxDuration,

        minAge,
        maxAge,
        minWatchTime,
        maxWatchTime,
        numSubscriptions: subscriptions.length,
        numFavoriteGenres: favoriteGenres.length,
        subscriptionsIndex,
        favoriteGenresIndex,
    };

}