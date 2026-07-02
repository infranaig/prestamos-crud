import { formatMoney } from "../utils/loanMath";

export default function SummaryCards({ summary }) {
  return (
    <section className="stats-grid" aria-label="Resumen de prestamos">
      <article>
        <span>Prestado</span>
        <strong>{formatMoney(summary.totalPrincipal)}</strong>
      </article>
      <article>
        <span>Cobrado</span>
        <strong>{formatMoney(summary.totalPaid)}</strong>
      </article>
      <article>
        <span>Activos</span>
        <strong>{summary.activeLoans}</strong>
      </article>
    </section>
  );
}
