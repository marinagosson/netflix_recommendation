let timeoutId = setTimeout(() => {

    container.style.opacity = "0";

    setTimeout(() => {
        container.style.display = "none";
    }, 400);

}, 5000);

export function updateStatus(icon, message, autoHide = false) {

    const container = document.getElementById("statusContainer");

    document.getElementById("statusIcon").textContent = icon;
    document.getElementById("status").textContent = message;

    container.style.display = "flex";

    clearTimeout(timeoutId);

    if (autoHide) {

        timeoutId = setTimeout(() => {
            container.style.display = "none";
        }, 5000);

    }

}