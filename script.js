// Tabs 
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

// Mode Changer 
if (modeChanger) {
    modeChanger.addEventListener("click", () => {

        const html = document.documentElement;
        let mylight = document.querySelector(".sun")
        let mydark = document.querySelector(".moon")

        if (html.dataset.theme === "light") {

            html.dataset.theme = "dark"

            if (mylight) mylight.classList.remove("hidden")
            if (mydark) mydark.classList.add("hidden")

        }
        else {

            html.dataset.theme = "light"

            if (mydark) mydark.classList.remove("hidden")
            if (mylight) mylight.classList.add("hidden")
        }

    })
}

//Form Buttons
let formBtns = document.querySelectorAll(".expense-btn");

if (formBtns) {
    formBtns.forEach((btn) => {

        btn.addEventListener("click", () => {

            formBtns.forEach((b) => {

                b.classList.remove("active");

                let target = document.getElementById(b.dataset.target);
                if (target) target.classList.add("hidden");

            })

            btn.classList.add("active");

            let target = document.getElementById(btn.dataset.target);
            if (target) target.classList.remove("hidden")

        })
    })
}

// Balance 
let incomeAmount = document.querySelector("#incomeAmount");
let expenseAmount = document.querySelector("#expenseAmount");

let incomeForm = document.querySelector(".form-income");
let epxenseForm = document.querySelector(".form-expense");

let incomeTotal = document.querySelector(".total-income");
let expenseTotal = document.querySelector(".expense-total");
let totalBalanceAmount = document.querySelector(".total-balance");
let expTotal = document.querySelector(".exp-total");
let leftBalance = document.querySelector(".left-balance");

let IncomeAddtion = JSON.parse(localStorage.getItem("IncomeAddition")) || [];
let expenseAddtion = JSON.parse(localStorage.getItem("expenseAddtion")) || [];

let totalIncomeAddition = 0;
let totalExpenseAddition = 0;

let totalBalance = 0;

function sum(myarr) {
    return myarr.reduce((prev, curr) => {
        return prev + curr;
    }, 0)
}

if (incomeForm) {
    incomeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let amount = Number(incomeAmount.value);

        if (!Number.isFinite(amount) || amount <= 0) return
        IncomeAddtion.push(amount);

        localStorage.setItem(JSON.stringify("IncomeAddition"))

        totalIncomeAddition = sum(IncomeAddtion);
        totalBalance = totalIncomeAddition - totalExpenseAddition;

        incomeTotal.innerText = `$${totalIncomeAddition}`;
        totalBalanceAmount.innerText = `$${totalBalance}`;
        leftBalance.innerText = `$${totalBalance}`;

        incomeForm.reset();
    })
}

if (epxenseForm) {
    epxenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let amount = Number(expenseAmount.value);
        if (!Number.isFinite(amount) || amount <= 0) return;
        if (amount > totalBalance) return

        expenseAddtion.push(amount);

        localStorage.setItem(JSON.stringify("expenseAddtion"))

        totalExpenseAddition = sum(expenseAddtion);
        totalBalance = totalIncomeAddition - totalExpenseAddition;


        totalBalanceAmount.innerText = `$${totalBalance}`;
        leftBalance.innerText = `$${totalBalance}`;

        expenseTotal.innerText = `$${totalExpenseAddition}`;
        expTotal.innerText = `$${totalExpenseAddition}`;

        epxenseForm.reset();

    });
}