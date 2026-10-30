const trackerBtn = document.querySelectorAll(".tracker-btn");
const modeChanger = document.querySelector(".mode-changer");

trackerBtn.forEach((clicked) => {

    clicked.addEventListener("click", () => {

        trackerBtn.forEach((btn) => {
            btn.classList.remove("active");
            let target = document.getElementById(btn.dataset.target);
            if (target) target.classList.add("hidden")
        })

        clicked.classList.add("active");

        let target = document.getElementById(clicked.dataset.target);
        if (target) target.classList.remove("hidden")

    })

})


modeChanger.addEventListener("click", () => {

    const html = document.documentElement;
    let mylight = document.querySelector(".sun")
    let mydark = document.querySelector(".moon")

    if (html.dataset.theme === "light") {

        html.dataset.theme = "dark"

        mylight.classList.remove("hidden")
        mydark.classList.add("hidden")

    }
    else {

        html.dataset.theme = "light"

        mydark.classList.remove("hidden")
        mylight.classList.add("hidden")
    }

})