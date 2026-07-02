# Guia Para Crear Cuenta En GitHub Y Subir Este Proyecto

GitHub es una pagina donde puedes guardar tus proyectos de programacion.
Piensalo como una nube para codigo.

## Parte 1: Crear cuenta en GitHub

1. Entra a:

```txt
https://github.com/signup
```

2. Escribe tu correo.
3. Crea una contrasena segura.
4. Elige un nombre de usuario.
5. Selecciona tu pais o region.
6. Presiona `Create account`.
7. Revisa tu correo y verifica tu email.

GitHub pide verificar tu correo para poder hacer tareas basicas como crear repositorios.

Documentacion oficial:

```txt
https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github
```

## Parte 2: Crear un repositorio

Un repositorio es una carpeta de proyecto en GitHub.

1. Entra a GitHub.
2. Presiona el boton `+`.
3. Elige `New repository`.
4. Nombre recomendado:

```txt
prestamos-crud
```

5. Elige `Public` si quieres que otros lo vean.
6. No marques README, porque este proyecto ya tiene uno.
7. Presiona `Create repository`.

## Parte 3: Subir desde tu computadora

Abre una terminal dentro de la carpeta `prestamos-crud`.

Primero inicializa Git:

```bash
git init
```

Agrega los archivos:

```bash
git add .
```

Crea tu primer commit:

```bash
git commit -m "Crear CRUD de prestamos"
```

Conecta tu proyecto local con GitHub.
Cambia `TU-USUARIO` por tu usuario real:

```bash
git remote add origin https://github.com/TU-USUARIO/prestamos-crud.git
```

Cambia el nombre de la rama principal:

```bash
git branch -M main
```

Sube el proyecto:

```bash
git push -u origin main
```

## Parte 4: Publicarlo con GitHub Pages

GitHub Pages sirve para que tu app tenga un link publico.

1. Entra al repositorio en GitHub.
2. Ve a `Settings`.
3. Busca `Pages`.
4. En `Branch`, selecciona `main`.
5. Carpeta: `/root`.
6. Guarda.

Despues de unos minutos, GitHub te dara un link parecido a:

```txt
https://TU-USUARIO.github.io/prestamos-crud/
```

## Palabras que debes aprender

- Git: herramienta para guardar versiones de tu codigo.
- GitHub: pagina donde subes repositorios.
- Repositorio: carpeta de proyecto.
- Commit: una foto guardada del estado de tu proyecto.
- Push: subir tus commits a GitHub.
- GitHub Pages: publicar una pagina web gratis.
