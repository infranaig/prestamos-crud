import { useEffect, useMemo, useState } from "react";
import { EMPTY_LOAN } from "./constants";
import HelpPanel from "./components/HelpPanel";
import LoanForm from "./components/LoanForm";
import LoanList from "./components/LoanList";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import { getSummary, toNumber } from "./utils/loanMath";
import { loadLoans, saveLoans } from "./utils/storage";

function createLoan(data) {
  return {
    id: crypto.randomUUID(),
    ...data,
    principal: toNumber(data.principal),
    interestRate: toNumber(data.interestRate),
    installments: toNumber(data.installments),
    payments: [],
    createdAt: new Date().toISOString(),
  };
}

function validateLoan(data) {
  if (!data.customerName.trim()) return "Escribe el nombre del cliente.";
  if (toNumber(data.principal) <= 0) return "El monto prestado debe ser mayor que cero.";
  if (toNumber(data.interestRate) < 0) return "El interes no puede ser negativo.";
  if (toNumber(data.installments) <= 0) return "La cantidad de cuotas debe ser mayor que cero.";
  if (!data.startDate) return "Selecciona una fecha de inicio.";
  return "";
}

export default function App() {
  const [activeSection, setActiveSection] = useState("summary");
  const [loans, setLoans] = useState(() => loadLoans());
  const [formData, setFormData] = useState(EMPTY_LOAN);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [paymentDrafts, setPaymentDrafts] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    saveLoans(loans);
  }, [loans]);

  const summary = useMemo(() => getSummary(loans), [loans]);

  const filteredLoans = useMemo(() => {
    const cleanSearch = searchText.trim().toLowerCase();
    if (!cleanSearch) return loans;

    return loans.filter((loan) => {
      const name = loan.customerName.toLowerCase();
      const address = (loan.customerAddress || "").toLowerCase();
      return name.includes(cleanSearch) || address.includes(cleanSearch);
    });
  }, [loans, searchText]);

  function showMessage(text, type = "success") {
    setMessage({ text, type });
  }

  function resetForm() {
    setFormData({ ...EMPTY_LOAN, startDate: new Date().toISOString().slice(0, 10) });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const error = validateLoan(formData);

    if (error) {
      showMessage(error, "error");
      return;
    }

    if (formData.id) {
      setLoans((current) =>
        current.map((loan) =>
          loan.id === formData.id
            ? {
                ...loan,
                ...formData,
                principal: toNumber(formData.principal),
                interestRate: toNumber(formData.interestRate),
                installments: toNumber(formData.installments),
              }
            : loan,
        ),
      );
      showMessage("Prestamo actualizado.");
    } else {
      setLoans((current) => [...current, createLoan(formData)]);
      showMessage("Prestamo guardado.");
    }

    resetForm();
    setActiveSection("loans");
  }

  function handleEdit(loanId) {
    const loan = loans.find((item) => item.id === loanId);
    if (!loan) return;

    setFormData({
      ...loan,
      principal: String(loan.principal),
      interestRate: String(loan.interestRate),
      installments: String(loan.installments),
      customerAddress: loan.customerAddress || "",
      note: loan.note || "",
    });
    setActiveSection("form");
    setMessage({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(loanId) {
    setLoans((current) => current.filter((loan) => loan.id !== loanId));
    showMessage("Prestamo eliminado.");
  }

  function handlePaymentChange(loanId, amount) {
    setPaymentDrafts((current) => ({ ...current, [loanId]: amount }));
  }

  function handleAddPayment(loanId) {
    const amount = toNumber(paymentDrafts[loanId]);

    if (amount <= 0) {
      showMessage("El pago debe ser mayor que cero.", "error");
      return;
    }

    setLoans((current) =>
      current.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              payments: [
                ...(loan.payments || []),
                {
                  id: crypto.randomUUID(),
                  amount,
                  date: new Date().toISOString(),
                },
              ],
            }
          : loan,
      ),
    );
    setPaymentDrafts((current) => ({ ...current, [loanId]: "" }));
    showMessage("Pago registrado.");
  }

  function handleRemoveLastPayment(loanId) {
    const loan = loans.find((item) => item.id === loanId);

    if (!loan || !loan.payments?.length) {
      showMessage("Este prestamo no tiene pagos para quitar.", "error");
      return;
    }

    setLoans((current) =>
      current.map((item) =>
        item.id === loanId ? { ...item, payments: item.payments.slice(0, -1) } : item,
      ),
    );
    showMessage("Ultimo pago quitado.");
  }

  return (
    <main className="app-shell dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        onChangeSection={setActiveSection}
        totalPending={summary.totalPending}
      />

      <div className="main-content">
        <header className="app-header">
          <p className="eyebrow">Version React + Vite</p>
          <h1>Prestamos diarios</h1>
          <p className="intro">
            Registra prestamos, calcula el total con interes y controla pagos diarios, semanales,
            quincenales o mensuales.
          </p>
        </header>

        {activeSection === "summary" && (
          <>
            <SummaryCards summary={summary} />
            <section className="panel compact-panel">
              <p className="section-kicker">Vista general</p>
              <h2>Control rapido</h2>
              <p className="helper-text">
                Esta version usa componentes de React, estado con useState y persistencia con
                localStorage.
              </p>
            </section>
          </>
        )}

        {activeSection === "form" && (
          <LoanForm
            formData={formData}
            isEditing={Boolean(formData.id)}
            message={message}
            onCancelEdit={() => {
              resetForm();
              setMessage({ text: "", type: "" });
            }}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        )}

        {activeSection === "loans" && (
          <LoanList
            loans={filteredLoans}
            onAddPayment={handleAddPayment}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onPaymentChange={handlePaymentChange}
            onRemoveLastPayment={handleRemoveLastPayment}
            onSearch={setSearchText}
            paymentDrafts={paymentDrafts}
            searchText={searchText}
          />
        )}

        {activeSection === "help" && <HelpPanel />}
      </div>
    </main>
  );
}
