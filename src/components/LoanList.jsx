import LoanCard from "./LoanCard";

export default function LoanList({
  loans,
  onAddPayment,
  onDelete,
  onEdit,
  onPaymentChange,
  onRemoveLastPayment,
  onSearch,
  paymentDrafts,
  searchText,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Read / Delete / Pagos</p>
          <h2>Prestamos registrados</h2>
        </div>
        <input
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Buscar cliente o direccion..."
          type="search"
          value={searchText}
        />
      </div>

      <div className="loan-list">
        {loans.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            onAddPayment={onAddPayment}
            onDelete={onDelete}
            onEdit={onEdit}
            onPaymentChange={onPaymentChange}
            onRemoveLastPayment={onRemoveLastPayment}
            paymentValue={paymentDrafts[loan.id]}
          />
        ))}
      </div>

      {loans.length === 0 && <p className="empty-state">Todavia no hay prestamos registrados.</p>}
    </section>
  );
}
