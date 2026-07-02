import { EMPTY_LOAN } from "../constants";

export default function LoanForm({
  formData,
  isEditing,
  message,
  onCancelEdit,
  onChange,
  onSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Create / Update</p>
          <h2>{isEditing ? "Editar prestamo" : "Nuevo prestamo"}</h2>
        </div>
        {isEditing && (
          <button className="ghost-button" onClick={onCancelEdit} type="button">
            Cancelar edicion
          </button>
        )}
      </div>

      <form className="loan-form" onSubmit={onSubmit}>
        <label>
          Nombre del cliente
          <input
            name="customerName"
            onChange={onChange}
            placeholder="Ejemplo: Ana Perez"
            required
            type="text"
            value={formData.customerName}
          />
        </label>

        <label>
          Telefono
          <input
            name="customerPhone"
            onChange={onChange}
            placeholder="Ejemplo: 555-123-4567"
            type="tel"
            value={formData.customerPhone}
          />
        </label>

        <label className="full-width">
          Direccion donde vive
          <input
            name="customerAddress"
            onChange={onChange}
            placeholder="Ejemplo: Calle 10 #25-30, barrio Centro"
            type="text"
            value={formData.customerAddress}
          />
        </label>

        <label>
          Monto prestado
          <input
            min="1"
            name="principal"
            onChange={onChange}
            placeholder="1000"
            required
            step="0.01"
            type="number"
            value={formData.principal}
          />
        </label>

        <label>
          Interes %
          <input
            min="0"
            name="interestRate"
            onChange={onChange}
            placeholder="20"
            required
            step="0.01"
            type="number"
            value={formData.interestRate}
          />
        </label>

        <label>
          Frecuencia de pago
          <select name="paymentFrequency" onChange={onChange} required value={formData.paymentFrequency}>
            {["diario", "semanal", "quincenal", "mensual"].map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cantidad de cuotas
          <input
            min="1"
            name="installments"
            onChange={onChange}
            placeholder="20"
            required
            step="1"
            type="number"
            value={formData.installments}
          />
        </label>

        <label>
          Fecha de inicio
          <input
            name="startDate"
            onChange={onChange}
            required
            type="date"
            value={formData.startDate || EMPTY_LOAN.startDate}
          />
        </label>

        <label className="full-width">
          Nota
          <textarea
            name="note"
            onChange={onChange}
            placeholder="Ejemplo: paga en la tarde"
            rows="3"
            value={formData.note}
          />
        </label>

        <div className="form-actions full-width">
          <button type="submit">{isEditing ? "Actualizar prestamo" : "Guardar prestamo"}</button>
          <p className={`message ${message.type}`} aria-live="polite">
            {message.text}
          </p>
        </div>
      </form>
    </section>
  );
}
