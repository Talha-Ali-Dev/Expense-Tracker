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

//Form Buttons
let formBtns = document.querySelectorAll(".expense-btn");

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

// Balance 
let incomeAmount = document.querySelector("#incomeAmount");
let expenseAmount = document.querySelector("#expenseAmount");

let incomeForm = document.querySelector(".form-income");
let epxenseForm = document.querySelector(".form-expense");

let incomeTotal = document.querySelector(".total-income");
let expenseTotal = document.querySelector(".expense-total");
let totalBalanceAmount = document.querySelector(".total-balance");

let IncomeAddtion = [];
let expenseAddtion = [];

let totalIncomeAddition = 0;
let totalExpenseAddition = 0;

let totalBalance = 0;

function sum(myarr) {
    return myarr.reduce((prev, curr) => {
        return prev + curr;
    }, 0)
}

incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let amount = Number(incomeAmount.value);

    if (!Number.isFinite(amount) || amount < 0) return
    IncomeAddtion.push(amount);

    totalIncomeAddition = sum(IncomeAddtion);
    totalBalance = totalIncomeAddition - totalExpenseAddition;

    incomeTotal.innerText = `$${totalIncomeAddition}`;
    totalBalanceAmount.innerText = `$${totalBalance}`;

    incomeForm.reset();
})

epxenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let amount = Number(expenseAmount.value);
    if (!Number.isFinite(amount) || amount < 0) return;

    expenseAddtion.push(amount);
    totalExpenseAddition = sum(expenseAddtion);
    totalBalance = totalIncomeAddition - totalExpenseAddition;

    if(amount > totalBalance ) return

     totalBalanceAmount.innerText = `$${totalBalance}`;

    expenseTotal.innerText = `$${totalExpenseAddition}`;

    epxenseForm.reset();

});



