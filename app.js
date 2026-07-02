/*
  CRUD de Prestamos

  Esta app es parecida al CRUD de tareas, pero con datos mas reales.
  Vamos a guardar prestamos en un array.

  Cada prestamo tendra:
  - cliente
  - telefono
  - monto prestado
  - porcentaje de interes
  - frecuencia de pago
  - cantidad de cuotas
  - pagos realizados

  Importante:
  Esto es una app de aprendizaje. No reemplaza un sistema contable real.
*/

const STORAGE_KEY = "crud-prestamos-diarios";

const loanForm = document.querySelector("#loan-form");
const editingLoanId = document.querySelector("#editing-loan-id");
const customerName = document.querySelector("#customer-name");
const customerPhone = document.querySelector("#customer-phone");
const principal = document.querySelector("#principal");
const interestRate = document.querySelector("#interest-rate");
const paymentFrequency = document.querySelector("#payment-frequency");
const installments = document.querySelector("#installments");
const startDate = document.querySelector("#start-date");
const note = document.querySelector("#note");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit-button");
const formTitle = document.querySelector("#form-title");
const message = document.querySelector("#message");
const loanList = document.querySelector("#loan-list");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");

const summaryPending = document.querySelector("#summary-pending");
const summaryPrincipal = document.querySelector("#summary-principal");
const summaryPaid = document.querySelector("#summary-paid");
const summaryActive = document.querySelector("#summary-active");

let loans = loadLoans();
let searchText = "";

// Intl.NumberFormat nos ayuda a mostrar dinero de forma bonita: $1,000.00
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatMoney(amount) {
  return moneyFormatter.format(amount);
}

function toNumber(value) {
  return Number(value) || 0;
}

function loadLoans() {
  const savedLoans = localStorage.getItem(STORAGE_KEY);

  if (!savedLoans) {
    return [];
  }

  try {
    return JSON.parse(savedLoans);
  } catch {
    return [];
  }
}

function saveLoans() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
}

function showMessage(text, type = "success") {
  message.textContent = text;
  message.className = `message ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

/*
  totalToPay:
  Si presto 1000 con 20% de interes:
  1000 + (1000 * 20 / 100) = 1200
*/
function calculateTotalToPay(loan) {
  return loan.principal + loan.principal * (loan.interestRate / 100);
}

function calculatePaid(loan) {
  return loan.payments.reduce((total, payment) => total + payment.amount, 0);
}

function calculateRemaining(loan) {
  return Math.max(calculateTotalToPay(loan) - calculatePaid(loan), 0);
}

function calculateInstallmentAmount(loan) {
  return calculateTotalToPay(loan) / loan.installments;
}

function getLoanStatus(loan) {
  return calculateRemaining(loan) <= 0 ? "Pagado" : "Activo";
}

function createLoan(data) {
  return {
    id: crypto.randomUUID(),
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    principal: data.principal,
    interestRate: data.interestRate,
    paymentFrequency: data.paymentFrequency,
    installments: data.installments,
    startDate: data.startDate,
    note: data.note,
    payments: [],
    createdAt: new Date().toISOString(),
  };
}

function getFormData() {
  return {
    customerName: customerName.value.trim(),
    customerPhone: customerPhone.value.trim(),
    principal: toNumber(principal.value),
    interestRate: toNumber(interestRate.value),
    paymentFrequency: paymentFrequency.value,
    installments: toNumber(installments.value),
    startDate: startDate.value,
    note: note.value.trim(),
  };
}

function validateLoan(data) {
  if (!data.customerName) {
    return "Escribe el nombre del cliente.";
  }

  if (data.principal <= 0) {
    return "El monto prestado debe ser mayor que cero.";
  }

  if (data.interestRate < 0) {
    return "El interes no puede ser negativo.";
  }

  if (data.installments <= 0) {
    return "La cantidad de cuotas debe ser mayor que cero.";
  }

  if (!data.startDate) {
    return "Selecciona una fecha de inicio.";
  }

  return "";
}

function resetForm() {
  loanForm.reset();
  editingLoanId.value = "";
  startDate.valueAsDate = new Date();
  submitButton.textContent = "Guardar prestamo";
  formTitle.textContent = "Nuevo prestamo";
  cancelEditButton.classList.add("hidden");
}

function addLoan(data) {
  loans.push(createLoan(data));
  saveLoans();
  render();
  resetForm();
  showMessage("Prestamo guardado.");
}

function updateLoan(loanId, data) {
  loans = loans.map((loan) => {
    if (loan.id !== loanId) {
      return loan;
    }

    return {
      ...loan,
      ...data,
    };
  });

  saveLoans();
  render();
  resetForm();
  showMessage("Prestamo actualizado.");
}

function deleteLoan(loanId) {
  /*
    Para esta version de aprendizaje eliminamos directo.
    En una version mas avanzada podemos crear un modal bonito de confirmacion.
  */
  loans = loans.filter((loan) => loan.id !== loanId);
  saveLoans();
  render();
  showMessage("Prestamo eliminado.");
}

function startEditing(loanId) {
  const loan = loans.find((item) => item.id === loanId);

  if (!loan) {
    return;
  }

  editingLoanId.value = loan.id;
  customerName.value = loan.customerName;
  customerPhone.value = loan.customerPhone;
  principal.value = loan.principal;
  interestRate.value = loan.interestRate;
  paymentFrequency.value = loan.paymentFrequency;
  installments.value = loan.installments;
  startDate.value = loan.startDate;
  note.value = loan.note;

  submitButton.textContent = "Actualizar prestamo";
  formTitle.textContent = "Editar prestamo";
  cancelEditButton.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addPayment(loanId, amount) {
  const loan = loans.find((item) => item.id === loanId);

  if (!loan) {
    return;
  }

  if (amount <= 0) {
    showMessage("El pago debe ser mayor que cero.", "error");
    return;
  }

  loans = loans.map((item) => {
    if (item.id !== loanId) {
      return item;
    }

    return {
      ...item,
      payments: [
        ...item.payments,
        {
          id: crypto.randomUUID(),
          amount,
          date: new Date().toISOString(),
        },
      ],
    };
  });

  saveLoans();
  render();
  showMessage("Pago registrado.");
}

function removeLastPayment(loanId) {
  const loan = loans.find((item) => item.id === loanId);

  if (!loan || loan.payments.length === 0) {
    showMessage("Este prestamo no tiene pagos para quitar.", "error");
    return;
  }

  loans = loans.map((item) => {
    if (item.id !== loanId) {
      return item;
    }

    return {
      ...item,
      payments: item.payments.slice(0, -1),
    };
  });

  saveLoans();
  render();
  showMessage("Ultimo pago quitado.");
}

function getFilteredLoans() {
  const cleanSearch = searchText.trim().toLowerCase();

  if (!cleanSearch) {
    return loans;
  }

  return loans.filter((loan) => loan.customerName.toLowerCase().includes(cleanSearch));
}

function renderSummary() {
  const totalPrincipal = loans.reduce((total, loan) => total + loan.principal, 0);
  const totalPaid = loans.reduce((total, loan) => total + calculatePaid(loan), 0);
  const totalPending = loans.reduce((total, loan) => total + calculateRemaining(loan), 0);
  const activeLoans = loans.filter((loan) => getLoanStatus(loan) === "Activo").length;

  summaryPrincipal.textContent = formatMoney(totalPrincipal);
  summaryPaid.textContent = formatMoney(totalPaid);
  summaryPending.textContent = formatMoney(totalPending);
  summaryActive.textContent = activeLoans;
}

function renderLoans() {
  const visibleLoans = getFilteredLoans();
  loanList.innerHTML = "";

  visibleLoans.forEach((loan) => {
    const totalToPay = calculateTotalToPay(loan);
    const paid = calculatePaid(loan);
    const remaining = calculateRemaining(loan);
    const installmentAmount = calculateInstallmentAmount(loan);
    const status = getLoanStatus(loan);

    const card = document.createElement("article");
    card.className = status === "Pagado" ? "loan-card is-paid" : "loan-card";

    card.innerHTML = `
      <div class="loan-main">
        <div class="loan-title">
          <h3>${loan.customerName}</h3>
          <span class="badge ${status === "Pagado" ? "paid" : ""}">${status}</span>
        </div>

        <div class="loan-details">
          <div>
            <span>Prestado</span>
            <strong>${formatMoney(loan.principal)}</strong>
          </div>
          <div>
            <span>Total con interes</span>
            <strong>${formatMoney(totalToPay)}</strong>
          </div>
          <div>
            <span>Pagado</span>
            <strong>${formatMoney(paid)}</strong>
          </div>
          <div>
            <span>Pendiente</span>
            <strong>${formatMoney(remaining)}</strong>
          </div>
          <div>
            <span>Cuota ${loan.paymentFrequency}</span>
            <strong>${formatMoney(installmentAmount)}</strong>
          </div>
        </div>

        <p class="loan-note">
          ${loan.customerPhone ? `Telefono: ${loan.customerPhone}. ` : ""}
          Inicio: ${loan.startDate}. Interes: ${loan.interestRate}%.
          ${loan.note ? `Nota: ${loan.note}` : ""}
        </p>
      </div>

      <div class="loan-actions">
        <button class="pay-button" type="button" data-action="pay" data-id="${loan.id}">Registrar pago</button>
        <input
          aria-label="Monto de pago para ${loan.customerName}"
          data-payment-input="${loan.id}"
          min="1"
          placeholder="${formatMoney(Math.min(installmentAmount, remaining))}"
          step="0.01"
          type="number"
        />
        <button type="button" data-action="edit" data-id="${loan.id}">Editar</button>
        <button type="button" data-action="undo-payment" data-id="${loan.id}">Quitar ultimo pago</button>
        <button class="delete-button" type="button" data-action="delete" data-id="${loan.id}">Eliminar</button>
      </div>
    `;

    loanList.append(card);
  });

  emptyState.classList.toggle("hidden", visibleLoans.length > 0);
}

function render() {
  renderSummary();
  renderLoans();
}

loanForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMessage();

  const data = getFormData();
  const error = validateLoan(data);

  if (error) {
    showMessage(error, "error");
    return;
  }

  if (editingLoanId.value) {
    updateLoan(editingLoanId.value, data);
  } else {
    addLoan(data);
  }
});

cancelEditButton.addEventListener("click", () => {
  resetForm();
  clearMessage();
});

searchInput.addEventListener("input", () => {
  searchText = searchInput.value;
  renderLoans();
});

/*
  Event delegation:
  En vez de poner un addEventListener a cada boton,
  escuchamos clics en toda la lista y revisamos que boton fue presionado.
*/
loanList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const loanId = button.dataset.id;
  const action = button.dataset.action;

  if (action === "pay") {
    /*
      Buscamos el input de pago que pertenece a este prestamo.
      Asi evitamos usar prompt() y todo queda visible en la pantalla.
    */
    const paymentInput = document.querySelector(`[data-payment-input="${loanId}"]`);
    const amount = toNumber(paymentInput.value);
    addPayment(loanId, amount);
    paymentInput.value = "";
  }

  if (action === "edit") {
    startEditing(loanId);
  }

  if (action === "undo-payment") {
    removeLastPayment(loanId);
  }

  if (action === "delete") {
    deleteLoan(loanId);
  }
});

resetForm();
render();
