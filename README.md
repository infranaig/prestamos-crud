# CRUD De Prestamos Diarios

Esta es tu segunda app CRUD. El objetivo es aprender con un ejemplo mas parecido a un negocio real.

La app permite:

- Crear prestamos.
- Ver prestamos registrados.
- Editar prestamos.
- Eliminar prestamos.
- Registrar pagos.
- Quitar el ultimo pago si te equivocaste.
- Calcular total con interes.
- Ver total prestado, cobrado, pendiente y prestamos activos.
- Guardar datos en `localStorage`.

## Como abrir la app

Abre este archivo en el navegador:

```txt
index.html
```

No necesitas instalar nada. Es HTML, CSS y JavaScript puro.

## Como probar el CRUD

### Create: crear

Llena el formulario:

- Nombre del cliente.
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

- `index.html`: estructura visual.
- `styles.css`: diseno.
- `app.js`: logica del CRUD.
- `GITHUB.md`: guia para crear cuenta y subir el proyecto.

## Nota importante

Esta app es para aprender programacion. Si algun dia la usas para un negocio real, despues conviene agregar:

- Login.
- Base de datos real.
- Copias de seguridad.
- Seguridad.
- Historial completo de pagos.
- Reportes.
