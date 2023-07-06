function cityBreaks() {
    window.close();
    window.open("C:/Users/anama/Desktop/site/city_breaks.html");
}


// LOGIN
document.getElementById("signup2").addEventListener("click", newHere);
document.getElementById("login2").addEventListener("click", notNew);

function newHere() {
    document.getElementById("sect_login").style.display = "none";
    document.getElementById("new_here").style.display = "none";
    document.getElementById("sect_signup").style.display = "flex";
    document.getElementById("not_new").style.display = "flex";
}

function notNew() {
    document.getElementById("sect_login").style.display = "flex";
    document.getElementById("new_here").style.display = "flex";
    document.getElementById("sect_signup").style.display = "none";
    document.getElementById("not_new").style.display = "none";
}