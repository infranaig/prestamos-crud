export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function toNumber(value) {
  return Number(value) || 0;
}

export function formatMoney(amount) {
  return moneyFormatter.format(toNumber(amount));
}

export function calculateTotalToPay(loan) {
  return toNumber(loan.principal) + toNumber(loan.principal) * (toNumber(loan.interestRate) / 100);
}

export function calculatePaid(loan) {
  return (loan.payments || []).reduce((total, payment) => total + toNumber(payment.amount), 0);
}

export function calculateRemaining(loan) {
  return Math.max(calculateTotalToPay(loan) - calculatePaid(loan), 0);
}

export function calculateInstallmentAmount(loan) {
  const installments = toNumber(loan.installments);
  return installments > 0 ? calculateTotalToPay(loan) / installments : 0;
}

export function getLoanStatus(loan) {
  return calculateRemaining(loan) <= 0 ? "Pagado" : "Activo";
}

export function getSummary(loans) {
  return loans.reduce(
    (summary, loan) => {
      summary.totalPrincipal += toNumber(loan.principal);
      summary.totalPaid += calculatePaid(loan);
      summary.totalPending += calculateRemaining(loan);

      if (getLoanStatus(loan) === "Activo") {
        summary.activeLoans += 1;
      }

      return summary;
    },
    {
      totalPrincipal: 0,
      totalPaid: 0,
      totalPending: 0,
      activeLoans: 0,
    },
  );
}
