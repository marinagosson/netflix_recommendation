export function renderWatchedMovies(user) {
    const container =
        document.getElementById("watchedMovies");

    container.innerHTML = "";

    user.watchedMovies.forEach(movie => {
        const card =
            document.createElement("div");

        card.className = "movie-chip";

        card.innerHTML = `
            <h4>${movie.title}</h4>

            <small>${movie.year}</small>
        `;

        container.appendChild(card);

     });
}