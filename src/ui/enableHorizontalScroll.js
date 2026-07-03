export function enableHorizontalScroll(selector) {

    document.querySelectorAll(selector).forEach(element => {

        element.addEventListener("wheel", event => {

            event.preventDefault();

            element.scrollLeft += event.deltaY;

        });

    });

}