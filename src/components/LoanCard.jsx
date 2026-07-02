import {
  calculateInstallmentAmount,
  calculatePaid,
  calculateRemaining,
  calculateTotalToPay,
  formatMoney,
  getLoanStatus,
} from "../utils/loanMath";

export default function LoanCard({
  loan,
  onAddPayment,
  onDelete,
  onEdit,
  onPaymentChange,
  onRemoveLastPayment,
  paymentValue,
}) {
  const totalToPay = calculateTotalToPay(loan);
  const paid = calculatePaid(loan);
  const remaining = calculateRemaining(loan);
  const installmentAmount = calculateInstallmentAmount(loan);
  const status = getLoanStatus(loan);

  return (
    <article className={`loan-card ${status === "Pagado" ? "is-paid" : ""}`}>
      <div className="loan-main">
        <div className="loan-title">
          <h3>{loan.customerName}</h3>
          <span className={`badge ${status === "Pagado" ? "paid" : ""}`}>{status}</span>
        </div>

        <div className="loan-details">
          <div>
            <span>Prestado</span>
            <strong>{formatMoney(loan.principal)}</strong>
          </div>
          <div>
            <span>Total con interes</span>
            <strong>{formatMoney(totalToPay)}</strong>
          </div>
          <div>
            <span>Pagado</span>
            <strong>{formatMoney(paid)}</strong>
          </div>
          <div>
            <span>Pendiente</span>
            <strong>{formatMoney(remaining)}</strong>
          </div>
          <div>
            <span>Cuota {loan.paymentFrequency}</span>
            <strong>{formatMoney(installmentAmount)}</strong>
          </div>
        </div>

        <p className="loan-note">
          {loan.customerPhone ? `Telefono: ${loan.customerPhone}. ` : ""}
          {loan.customerAddress ? `Direccion: ${loan.customerAddress}. ` : ""}
          Inicio: {loan.startDate}. Interes: {loan.interestRate}%.
          {loan.note ? ` Nota: ${loan.note}` : ""}
        </p>
      </div>

      <div className="loan-actions">
        <button className="pay-button" onClick={() => onAddPayment(loan.id)} type="button">
          Registrar pago
        </button>
        <input
          aria-label={`Monto de pago para ${loan.customerName}`}
          min="1"
          onChange={(event) => onPaymentChange(loan.id, event.target.value)}
          placeholder={formatMoney(Math.min(installmentAmount, remaining))}
          step="0.01"
          type="number"
          value={paymentValue || ""}
        />
        <button onClick={() => onEdit(loan.id)} type="button">
          Editar
        </button>
        <button onClick={() => onRemoveLastPayment(loan.id)} type="button">
          Quitar ultimo pago
        </button>
        <button className="delete-button" onClick={() => onDelete(loan.id)} type="button">
          Eliminar
        </button>
      </div>
    </article>
  );
}
