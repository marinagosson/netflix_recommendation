import { recommendMovies } from "./recommendMovie.js";
import { renderRecommendations } from "../ui/renderRecommendations.js";

export async function generateRecommendations(
    userId,
    model,
    context,
    limit
) {

    const recommendations = await recommendMovies(
        userId, 
        model,
        context,
        limit
    );

    renderRecommendations(recommendations);

}