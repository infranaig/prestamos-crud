export const STORAGE_KEY = "crud-prestamos-diarios";

export const EMPTY_LOAN = {
  id: "",
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  principal: "",
  interestRate: "",
  paymentFrequency: "diario",
  installments: "",
  startDate: new Date().toISOString().slice(0, 10),
  note: "",
};

export const MENU_ITEMS = [
  { id: "summary", label: "Resumen" },
  { id: "form", label: "Nuevo prestamo" },
  { id: "loans", label: "Prestamos" },
  { id: "help", label: "Ayuda" },
];
