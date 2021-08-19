
window.addEventListener('load', function(e) {
    var pos1 = document.getElementsByClassName("carousel")[0].getBoundingClientRect();
    var pos2 = document.getElementsByClassName("carousel")[1].getBoundingClientRect();

    document.getElementsByClassName("leftArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";

    document.getElementsByClassName("leftArrow")[1].style.top = (pos2.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[1].style.top = (pos2.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("leftArrow")[1].style.left = (pos2.left + window.scrollX + 30) + "px";
    document.getElementsByClassName("rightArrow")[1].style.right = (pos2.right + window.scrollX - pos2.width + 30) + "px";
});

window.addEventListener('resize', function(e) {
    var pos1 = document.getElementsByClassName("carousel")[0].getBoundingClientRect();
    var pos2 = document.getElementsByClassName("carousel")[1].getBoundingClientRect();

    document.getElementsByClassName("leftArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";

    document.getElementsByClassName("leftArrow")[1].style.top = (pos2.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[1].style.top = (pos2.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("leftArrow")[1].style.left = (pos2.left + window.scrollX + 30) + "px";
    document.getElementsByClassName("rightArrow")[1].style.right = (pos2.right + window.scrollX - pos2.width + 30) + "px";
});