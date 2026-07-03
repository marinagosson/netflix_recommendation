export async function loadMovies() {
    console.log("carregando filmes...")
    const response = await fetch('./data/netflix_titles.csv');

    if (!response.ok) {
        throw new Error('Não foi possível carregar o arquivo CSV');
    }
    
    const csv = await response.text();

    const result = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true
    });

    const movies = result.data.map(movie => {

        let currentRating = movie.rating;
        let currentDuration = movie.duration;

        if (movie.rating && movie.rating.includes("min") && !movie.duration) {
            currentDuration = movie.rating;
            currentRating = "";
        }

        return {
            showId: movie.show_id,
            type: movie.type,
            title: movie.title,
            director: movie.director,
            cast: movie.cast,
            country: movie.country,
            dateAdded: movie.date_added,
            year: Number(movie.release_year),
            rating: currentRating,
            duration: currentDuration,
            listedIn: movie.listed_in,
            description: movie.description
        };
     });

    return movies;

    return result.data;
}