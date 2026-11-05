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

let IncomeAddtion = JSON.parse(localStorage.getItem("IncomeAddtion")) || [];
let expenseAddtion = JSON.parse(localStorage.getItem("expenseAddtion")) || [];

let date = new Date();

let totalIncomeAddition = 0;
let totalExpenseAddition = 0;

let totalBalance = 0;

function sum(myarr) {
    return myarr.reduce((prev, curr) => {
        return prev + curr;
    }, 0)
}

// Transactions
let expenseOptions = document.querySelector("#expense-options");
let transactions = document.querySelector(".transactions");
let expenseNote = document.querySelector("#expense-note");
let incomeNote = document.querySelector("#income-note");

totalIncomeAddition = sum(IncomeAddtion);
totalExpenseAddition = sum(expenseAddtion);
totalBalance = totalIncomeAddition - totalExpenseAddition;

if (incomeTotal) incomeTotal.innerText = `$${totalIncomeAddition}`;
if (expenseTotal) expenseTotal.innerText = `$${totalExpenseAddition}`;
if (expTotal) expTotal.innerText = `$${totalExpenseAddition}`;
if (totalBalanceAmount) totalBalanceAmount.innerText = `$${totalBalance}`;
if (leftBalance) leftBalance.innerText = `$${totalBalance}`;

if (incomeForm) {
    incomeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!incomeAmount) return;

        let amount = Number(incomeAmount.value);

        if (!Number.isFinite(amount) || amount <= 0) return
        IncomeAddtion.push(amount);

        localStorage.setItem("IncomeAddtion", JSON.stringify(IncomeAddtion))

        totalIncomeAddition = sum(IncomeAddtion);
        totalBalance = totalIncomeAddition - totalExpenseAddition;

        incomeTotal.innerText = `$${totalIncomeAddition}`;
        totalBalanceAmount.innerText = `$${totalBalance}`;
        leftBalance.innerText = `$${totalBalance}`;

        transactions.insertAdjacentHTML("beforeend", `
            
            <div
                class="transaction-block-deposit p-4 flex justify-between items-center hover:bg-blob2/40 rounded-sm">

                <div>
                 <p class="text-text/95 font-medium text-[16px]"> ${incomeNote.value}</p>
                 <p class="text-muted text-xs font-medium mt-1">Income - ${date.toLocaleDateString("en-US", { weekday: "long" })}, ${date.toLocaleTimeString()}</p>
                </div>

                <div class="spent text-income font-medium text-[16px]">
                 +$${amount}
                </div>

            </div>
            
            `)

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

        localStorage.setItem("expenseAddtion", JSON.stringify(expenseAddtion))

        totalExpenseAddition = sum(expenseAddtion);
        totalBalance = totalIncomeAddition - totalExpenseAddition;


        totalBalanceAmount.innerText = `$${totalBalance}`;
        leftBalance.innerText = `$${totalBalance}`;

        expenseTotal.innerText = `$${totalExpenseAddition}`;
        expTotal.innerText = `$${totalExpenseAddition}`;

        transactions.insertAdjacentHTML("beforeend", `
    
       <div
        class="transaction-block-spent p-4 flex justify-between items-center hover:bg-blob2/30 rounded-sm">

            <div>
                 <p class="text-text/95 font-medium text-[16px]"> ${expenseNote.value} </p>
                 <p class="text-muted text-xs font-medium mt-1">${expenseOptions.value} - ${date.toLocaleDateString("en-US", { weekday: "long" })}, ${date.toLocaleTimeString()}</p>
            </div>

            <div class="spent text-expense font-medium text-[16px]">
                 -$${amount}
             </div>

        </div>

    `);

        epxenseForm.reset();

    });
}