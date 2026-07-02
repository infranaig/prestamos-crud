# CRUD De Prestamos Diarios - React + Vite

Esta es la version moderna del CRUD usando React + Vite.

La app permite:

- Navegar con un sidebar de opciones.
- Crear prestamos.
- Ver prestamos registrados.
- Editar prestamos.
- Eliminar prestamos.
- Registrar pagos.
- Quitar el ultimo pago si te equivocaste.
- Calcular total con interes.
- Ver total prestado, cobrado, pendiente y prestamos activos.
- Guardar datos en `localStorage`.

## Instalar y ejecutar

Instala dependencias:

```bash
npm install
```

Ejecuta en desarrollo:

```bash
npm run dev
```

Compila para produccion:

```bash
npm run build
```

## Como probar el CRUD

Primero usa el sidebar lateral:

- `Resumen`: muestra totales generales.
- `Nuevo prestamo`: abre el formulario.
- `Prestamos`: muestra la lista y acciones.
- `Ayuda`: explica el flujo basico.

### Create: crear

Entra a `Nuevo prestamo` y llena el formulario:

- Nombre del cliente.
- Direccion donde vive.
- Monto prestado.
- Interes.
- Frecuencia de pago.
- Cantidad de cuotas.
- Fecha de inicio.

Luego presiona `Guardar prestamo`.

### Read: leer

El prestamo aparece abajo en una tarjeta con:

- Monto prestado.
- Total con interes.
- Pagado.
- Pendiente.
- Cuota sugerida.

### Update: actualizar

Puedes actualizar de dos maneras:

- Presiona `Editar` para cambiar datos del prestamo.
- Escribe un monto en el campo de pago y presiona `Registrar pago`.

### Delete: eliminar

Presiona `Eliminar` para borrar el prestamo.

## Formula basica

Si prestas 1000 con 20% de interes:

```txt
total = 1000 + (1000 * 20 / 100)
total = 1200
```

Si son 20 cuotas:

```txt
cuota = 1200 / 20
cuota = 60
```

## Archivos

- `src/App.jsx`: estado principal y flujo del CRUD.
- `src/components`: componentes de React.
- `src/utils`: calculos y localStorage.
- `vite.config.js`: configuracion de Vite y GitHub Pages.
- `GITHUB.md`: guia para crear cuenta y subir el proyecto.

## Nota importante

Esta app es para aprender programacion. Si algun dia la usas para un negocio real, despues conviene agregar:

- Login.
- Base de datos real.
- Copias de seguridad.
- Seguridad.
- Historial completo de pagos.
- Reportes.
