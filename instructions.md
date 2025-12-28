Desarrollo en Entorno Cliente
Proyecto: “Sueños Valenti – Portal de Sesiones
Interactivas de Supra Consciencia”
(Versión cliente: JS + DOM + APIs + Módulos)
La empresa Sueños Valenti quiere complementar su web creando una parte
totalmente cliente, sin backend propio.
La aplicación debe ejecutarse directamente en el navegador y permitir a los
usuarios:s
• Consultar sesiones espirituales desde un archivo local JSON o una API
pública.
• Filtrar, buscar y seleccionar sesiones dinámicamente mediante DOM.
• Gestionar un “carrito espiritual” almacenado en localStorage.
• Interactuar con formularios, validaciones y eventos.
• Dividir el código en módulos ES (import/export).
• Mostrar una interfaz dinámica con JavaScript.

FUNCIONALIDADES

1. Interfaz inicial
   Al abrir index.html, debe mostrarse:
   • Nombre del portal: Sueños Valenti – Sesiones Interactivas
   • Descripción breve
   • Botones:
   o “Ver sesiones”
   o “Carrito”
   o “Preferencias”

Esta vista se actualiza con DOM, no recargando la página.

2. Carga de sesiones (fetch + JSON)
   El alumno debe:
   • Crear un archivo data/sesiones.json con varias sesiones grupales:
   [
   { "id": 1, "nombre": "Viaje al Ser Interno", "precio": 105 },
   { "id": 2, "nombre": "Meditación del Despertar", "precio": 200 },
   { "id": 3, "nombre": "Conexión SupraConsciente", "precio": 205 }
   ]

• Cargarlo usando fetch, como en tus scripts (script.js, funciones.js).
• Mostrar las sesiones con DOM: tarjetas, listas o tabla.
• Cada sesión debe tener un botón “Añadir al Carrito”.

3. Carrito usando localStorage
   • El carrito debe poder:
   o Añadir sesiones
   o Eliminar sesiones
   o Vaciar carrito
   • Debe persistir entre recargas mediante localStorage.
   • Mostrar número de elementos y total.

4. Uso de Módulos ES6 (import/export)
   Separar el proyecto en módulos como viste en:
   • main.js
   • funciones.js

Requisitos:
• Debe haber al menos 3 módulos distintos
• Usar import/export correctamente
• main.js debe ser el módulo coordinador

5. Eventos + DOM avanzado
   Se evaluará:
   • Escucha de clics, input
   CRITERIOS DE EVALUACIÓN (10
   puntos)
1. JavaScript básico: variables, funciones, arrays, objetos (1 punto)
   • Código correcto, sin errores de sintaxis
   • Uso adecuado de funciones y estructuras de datos

1. Manipulación avanzada del DOM (2 puntos)
   • Crear y eliminar nodos
   • Renderizado dinámico basado en datos
   • Eventos correctamente aplicados
1. Consumo de APIs / fetch + JSON (2 puntos)
   • Carga correcta de sesiones desde JSON
   • Manejo correcto de Promesas (async/await recomendado)

1. Uso de localStorage o sessionStorage (2 puntos)
   • Carrito persistente

1. Modularización con ES Modules (2 puntos)
   • Módulos bien separados (api, ui, carrito, utils, main)
   • Buena organización del código

1. Creatividad, claridad y limpieza de código (1 punto)
   • Código comprensible
   • Interfaz cuidada
   • Buen uso de nombres y comentarios
