// manage hamburger menu
let shown = false;
let dropdown = document.getElementById("dropdown")

function toggleDropdown() {
    shown = !shown;
    if (shown) {
        dropdown.style.visibility = "visible";
    } else {
        dropdown.style.visibility = "hidden";
    }

}