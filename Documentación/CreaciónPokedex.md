# Ejercicio Pokedex
## 1. Estructura inicial del proyecto

### Qué hice
- Creé una carpeta base llamada `pokedex`.
- Definí la estructura inicial del proyecto separando archivos por responsabilidad:
  - `index.html` para el listado.
  - `pokemon.html` para el detalle.
  - `style.css` para los estilos.
  - `app.js` y `pokemon.js` para la lógica.

### Qué aprendí
- Es importante separar la estructura (HTML), el diseño (CSS) y la lógica (JS).
- Tener una estructura clara desde el inicio facilita el proyecto.

### Problemas encontrados
- Al inicio olvidé enlazar correctamente el archivo CSS.
- Abría solo el archivo HTML en VS Code y no la carpeta completa, lo que causó confusión.

---

## 2. Maquetación del listado de Pokémon

### Qué hice
- Construí la pantalla principal con un diseño tipo “aplicación móvil”.
- Implementé un grid de 3 columnas para mostrar los Pokémon.
- Cada Pokémon se muestra como una tarjeta con número, imagen y nombre.

### Qué aprendí
- El uso de `display: grid` facilita mucho la construcción de layouts repetitivos.

### Problemas encontrados
- Inicialmente los Pokémon se mostraban en una sola columna.
- El problema se debía a que el `<ul>` no estaba configurado como grid.

---

## 3. Consumo de la PokéAPI (listado)

### Qué hice
- Utilicé `fetch()` para obtener los primeros 151 Pokémon desde la PokéAPI.
- Procesé los datos recibidos y los rendericé dinámicamente en el DOM.
- Evité hacer una petición por cada Pokémon para mejorar el rendimiento.

### Qué aprendí
- Cómo funciona una petición HTTP básica con `fetch`.
- Qué es una API REST y cómo interpretar su respuesta en formato JSON.
- La importancia de manejar errores cuando una petición falla.

### Problemas encontrados
- Al inicio no entendía bien la estructura del JSON de la API.
- Me costó identificar qué datos necesitaba y cuáles no.

---

## 4. Navegación a la vista de detalle

### Qué hice
- Implementé navegación usando parámetros en la URL (`pokemon.html?id=1`).
- Cada tarjeta del listado redirige a la vista de detalle correspondiente.

### Qué aprendí
- Cómo usar `URLSearchParams` para leer datos desde la URL.
- Que no es necesario crear un HTML por cada Pokémon.
- Que una sola página puede adaptarse dinámicamente según el parámetro recibido.

### Problemas encontrados
- Si el parámetro `id` no existía, la página fallaba.
- Se solucionó agregando un valor por defecto y validación del rango.

---

## 5. Vista de detalle del Pokémon

### Qué hice
- Mostré información detallada del Pokémon:
  - Imagen oficial
  - Tipos
  - Peso y altura
  - Habilidad
  - Descripción
  - Estadísticas base con barras
- Cambié dinámicamente el color de la pantalla según el tipo del Pokémon.

### Qué aprendí
- Cómo combinar datos de distintos endpoints de la API.
- Cómo manipular estilos dinámicamente desde JavaScript.
- Cómo construir componentes visuales reutilizables (barras de stats).

### Problemas encontrados
- Algunas descripciones no estaban en español.
- Fue necesario buscar primero la descripción en español y, si no existía, usar inglés.

---

## 6. Navegación entre Pokémon

### Qué hice
- Implementé botones de “anterior” y “siguiente”.
- Controlé los límites para evitar IDs inválidos.

### Qué aprendí
- A pensar en casos borde (primer y último Pokémon).
- A escribir código defensivo para evitar errores.
