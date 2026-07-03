
import { recommendMovies } from "../recommendation/recommendMovie.js";
import { renderWatchedMovies } from "./renderWatchedMovies.js";
import { generateRecommendations } from "../recommendation/generateRecommendations.js";

export function registerEvents(model, context) {
    console.log("registrando eventos...")

    const button = document.getElementById("recommendButton")
    const select = document.getElementById("usersSelect")

    button.addEventListener("click", () => { 
        const user = getSelectedUser(context)
        const limit = Number(document.getElementById("limit").value)

        generateRecommendations(
            user.id,
            model,
            context,
            limit 
        )
    })

    select.addEventListener("change", () => {
        renderWatchedMovies(getSelectedUser(context));
    });

}

function getSelectedUser(context) {

    const id = Number(
        document.getElementById("usersSelect").value
    );

    return context.usersWithHistory.find(
        user => user.id === id
    );

}