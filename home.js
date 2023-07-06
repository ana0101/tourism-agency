document.querySelector(".city_tour p").addEventListener("click", cityBreaks);
document.querySelector(".summer_tour p").addEventListener("click", summer);
document.querySelector(".winter_tour p").addEventListener("click", winter);

function cityBreaks() {
    window.open("C:/Users/anama/Desktop/site/city_breaks.html");
}
function summer() {
    window.open("C:/Users/anama/Desktop/site/summer.html")
}
function winter() {
    window.open("C:/Users/anama/Desktop/site/winter.html")
}


var ourTours = document.querySelector("#section_tours>h2");
timeout = setTimeout(function() {
    ourTours.style.color = "pink";
}, 3000);

ourTours.onclick = function(e) {
    e.currentTarget.style.color = "black";
}


var colors = ["red", "blue", "green", "yellow", "purple", "pink", "whitesmoke"];
var text = document.querySelectorAll(".text_bine h2");

for (let i = 0; i < text.length; i++) {
    text[i].onclick = function(e) {
        var randomNumber = Math.floor(Math.random() * colors.length);
        e.target.style.color = colors[randomNumber];
        e.stopPropagation();
    };
}


var image = document.querySelector("#bine img");
document.querySelector("#bine").onclick = function() {
    var randomNumber = Math.floor(Math.random() * 101);
    image.style.filter = "brightness(" + randomNumber + "%)";
};


document.body.onkeydown = function(e) {
    if (parseInt(e.key)) {
        nr = parseInt(e.key) * 1000;
        clearInterval(interval); 
        startInterval(nr); 
    }
};

var images = document.querySelectorAll("#about_us img");
var currentIndex = 0;
var nr = 4000;
images[currentIndex].style.display = "flex";

var interval;

function startInterval(delay) {
    interval = setInterval(function() {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = "none";
        }
        currentIndex ++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        images[currentIndex].style.display = "flex";
    }, delay);
}

startInterval(nr);