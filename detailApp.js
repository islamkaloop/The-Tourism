const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch("data.json")
    .then(response => response.json())
    .then(data => init(data["data"]));

function init(data) {
    document.querySelector("body").style.overflow = "scroll";

    const name = data[id]["name"];
    let s = "img/" + name + "/" + name.toLowerCase();
    document.querySelector(".cover img").src = s + "-cover.png";
    document.querySelector(".cover h1").innerHTML = data[id]["name"];
    document.querySelector(".cover h2").innerHTML = data[id]["country"];
    document.querySelector(".main-img img").src = s + "-main.png";
    document.querySelector(".history-disc p").innerHTML = data[id]["history"];
    document.querySelector(".galary .g1").src = s + "-g1.png";
    document.querySelector(".galary .g2").src = s + "-g2.png";
    document.querySelector(".galary .g3").src = s + "-g3.png";
    document.querySelector(".galary .g4").src = s + "-g4.png";
    document.querySelector(".galary .g5").src = s + "-g5.png";
    document.querySelector(".galary .g6").src = s + "-g6.png";
    document.querySelector(".climate-disc p").innerHTML = data[id]["climate"];
    
    const menu = document.querySelector(".menu");
    const navOpen = document.querySelector(".nav-open");
    const contacts = document.querySelector(".contact");
    const social = document.querySelector(".social");
    const logo = document.querySelector(".logo");

    const t1 = new TimelineMax({ paused: true, reversed: true });

    t1.to(navOpen, 0.5, { y: 0 })
        .fromTo(contacts, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "0.5")
        .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "0.9")
        .fromTo(logo, 0.2, { color: "white" }, { color: "block" }, "-=1")
        .fromTo(menu, 0.2, { color: "white" }, { color: "block" }, "-=1")

    menu.addEventListener('click', () => {
        t1.reversed() ? t1.play() : t1.reverse();
    });
}

function back(){
    document.location.href = './index.html';
}