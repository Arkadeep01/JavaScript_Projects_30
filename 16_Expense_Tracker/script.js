let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const desc = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details.");
        return;
    }

    transactions.push({ desc, amount, type });
    saveToLocalStorage();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    updateUI();
    updateChart();
}

function updateUI() {
    const list = document.getElementById("transaction-list");
    const balance = document.getElementById("balance");
    list.innerHTML = "";
    let total = 0;

    transactions.forEach((txn, i) => {
        const li = document.createElement("li");
        li.classList.add(txn.type);
        li.innerHTML = `<span>${txn.desc} - ₹${txn.amount.toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger" onclick="removeTransaction(${i})">x</button>`;

        if (txn.type === "income") total += txn.amount;
        else total -= txn.amount;

        list.appendChild(li);
    });

    balance.textContent = total.toFixed(2);
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    saveToLocalStorage();
    updateUI();
    updateChart();
}

const ctx = document.getElementById("expenseChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Income", "Expense"],
        datasets: [{
            label: "Financial Overview",
            data: [0, 0],
            backgroundColor: ["#00ff88", "#ff4d4d"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#fff",
                    font: {
                        size: 14
                    }
                }
            }
        }
    }
});

function updateChart() {
    const income = transactions.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);

    chart.data.datasets[0].data = [income, expense];
    chart.update();
}