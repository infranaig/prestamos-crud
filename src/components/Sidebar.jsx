import { MENU_ITEMS } from "../constants";
import { formatMoney } from "../utils/loanMath";

export default function Sidebar({ activeSection, onChangeSection, totalPending }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">P</span>
        <div>
          <strong>Prestamos</strong>
          <small>Panel React</small>
        </div>
      </div>

      <nav className="app-menu" aria-label="Menu de opciones">
        {MENU_ITEMS.map((item) => (
          <button
            className={`menu-button ${activeSection === item.id ? "active" : ""}`}
            key={item.id}
            onClick={() => onChangeSection(item.id)}
            type="button"
          >
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-total">
        <span>Total pendiente</span>
        <strong>{formatMoney(totalPending)}</strong>
      </div>
    </aside>
  );
}
