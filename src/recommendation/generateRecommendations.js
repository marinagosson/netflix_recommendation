import { recommendMovies } from "./recommendMovie.js";
import { renderRecommendations } from "../ui/renderRecommendations.js";

export function generateRecommendations(
    userId,
    model,
    context,
    limit
) {

    console.log(userId);
    const recommendations = recommendMovies(
        userId, 
        model,
        context,
        limit
    );

    console.log(recommendations);

    renderRecommendations(recommendations);

}