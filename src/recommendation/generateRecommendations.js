import { recommendMovies } from "./recommendMovie.js";
import { renderRecommendations } from "../ui/renderRecommendations.js";

export function generateRecommendations(
    user,
    model,
    context,
    limit
) {

    const recommendations = recommendMovies(
        user.id,
        model,
        context,
        limit
    );

    renderRecommendations(recommendations);

}