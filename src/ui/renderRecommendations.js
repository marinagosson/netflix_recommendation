export function renderRecommendations(recommendations) { 
    console.log("renderizando recomendações...")
    const container = document.getElementById("recommendations")

    container.innerHTML = ""

    recommendations.forEach(movie => {
        
        const card = document.createElement("article")
        card.className = "movie-card"

        card.innerHTML = `
            <h3>${movie.title}</h3>

            <p>
                <strong>Score:</strong>
                ${(movie.score * 100).toFixed(2)}%
            </p>

            <p>
                <strong>Ano:</strong>
                ${movie.year}
            </p>

            <p>
                <strong>Tipo:</strong>
                ${movie.type}
            </p>

            <p>
                <strong>Categoria:</strong>
                ${movie.listedIn}
            </p>

            <p>
                <strong>Classificação:</strong>
                ${movie.rating}
            </p>
        `
        container.appendChild(card)
    });
}