fetch("data.json")
    .then(response => response.json())
    .then(data => init(data["data"]));

function init(data) {
    const slids = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    const city = document.querySelector(".city");
    let currentPageIndex = 0;
    let pageNumber = 0;
    nextSlide(currentPageIndex);
    slids.forEach((slide, index) => {
        slide.addEventListener('click', function () {
            changeDots(this);
            nextSlide(index);
            pageNumber = index;
        });
    });
    function changeDots(dot) {
        slids.forEach(slide => {
            slide.classList.remove('active');
        });
        dot.classList.add('active');
    }
    function nextSlide(pageNumber) {
        let nextPageIndex = (currentPageIndex + 1) % 2;
        const currentPage = pages[currentPageIndex];
        const nextPage = pages[nextPageIndex];
        const theme = nextPage.querySelector(".theme a");
        const nextLeft = nextPage.querySelector(".theme .left");
        const nextRight = nextPage.querySelector(".theme .right");
        const nextText = nextPage.querySelector(".details");
        const currentLeft = currentPage.querySelector(".theme .left");
        const currentRight = currentPage.querySelector(".theme .right");
        const name = data[pageNumber]["name"];
        const color = data[pageNumber]["color"];
        const country = data[pageNumber]["country"];
        const date = data[pageNumber]["date"];

        theme.addEventListener('click', () => {
            document.location.href = './detail.html?id=' + pageNumber;
        })

        nextLeft.src = "img/" + name + "/" + name.toLowerCase() + "-left.png";
        nextRight.src = "img/" + name + "/" + name.toLowerCase() + "-right.png";

        nextText.querySelector("h1").innerHTML = name.toUpperCase();
        nextText.querySelector("h2").innerHTML = country
        nextText.querySelector("p").innerHTML = date

        const t1 = new TimelineMax({
            onStart: function () {
                slids.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                })
            },
            onComplete: function () {
                slids.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        t1.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
            .fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, "-=0.2")
            .to(city, 0.3, { backgroundImage: "radial-gradient(" + color + ", #0D0D0D)" })
            .fromTo(currentPage, 0.3, { opacity: 1, pointerEvents: "all" }, { opacity: 0, pointerEvents: "none" },)
            .fromTo(nextPage, 0.3, { opacity: 0, pointerEvents: "none" }, { opacity: 1, pointerEvents: "all" })
            .fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, "-=0.4")
            .fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, "-=0.6")
            .fromTo(nextText, 0.3, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
            .set(nextLeft, { clearProps: 'all' })
            .set(nextRight, { clearProps: 'all' })

        currentPageIndex = nextPageIndex;
    }

    document.addEventListener('wheel', throttle(scrollChange, 1500));
    document.addEventListener('touchmove', throttle(scrollChange, 1500));

    function scrollChange(e) {
        if (e.deltaY > 0) {
            pageNumber = (pageNumber + 1) % 3;
        } else {
            pageNumber = pageNumber - 1;
        }
        if (pageNumber < 0) pageNumber = 2;
        slids.forEach(slide => {
            slide.classList.remove('active');
        });
        slids[pageNumber].classList.add('active');
        nextSlide(pageNumber);
    }

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


function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
