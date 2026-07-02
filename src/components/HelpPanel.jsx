export default function HelpPanel() {
  return (
    <section className="panel">
      <p className="section-kicker">Guia rapida</p>
      <h2>Como usar esta app</h2>
      <div className="help-grid">
        <article>
          <strong>1. Crear</strong>
          <p>Entra en Nuevo prestamo, llena el formulario y guarda.</p>
        </article>
        <article>
          <strong>2. Leer</strong>
          <p>En Prestamos ves cada cliente, total, pagado, pendiente y cuota.</p>
        </article>
        <article>
          <strong>3. Actualizar</strong>
          <p>Usa Editar para cambiar datos o Registrar pago para abonar.</p>
        </article>
        <article>
          <strong>4. Eliminar</strong>
          <p>Usa Eliminar cuando quieras borrar un prestamo de la lista.</p>
        </article>
      </div>
    </section>
  );
}
