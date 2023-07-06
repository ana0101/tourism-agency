var buttons = document.querySelectorAll(".tour>.text button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onmouseenter = function() {
        buttons[i].classList.add("clasa");
    };

    buttons[i].onmouseout = function() {
        buttons[i].classList.remove("clasa");
    }
}