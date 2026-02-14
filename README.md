# 💰 Contabilidad Lotto

Sistema de Gestión Financiera moderno y completo para gestionar ventas, gastos, nómina y generar reportes financieros.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Características

### 📊 Gestión Completa
- ✅ **Registro de Ventas** - Gestiona todas tus ventas diarias
- ✅ **Gastos Diarios** - Controla tus gastos operativos
- ✅ **Pagos de Nómina** - Administra pagos a empleados
- ✅ **Gastos Fijos** - Registra costos mensuales recurrentes
- ✅ **Reportes Financieros** - Visualiza resúmenes y ganancias

### 🎨 Diseño Moderno
- ✅ **Interfaz Intuitiva** - Diseño limpio y fácil de usar
- ✅ **Modo Claro/Oscuro** - Cambia entre temas según tu preferencia
- ✅ **100% Responsivo** - Funciona perfectamente en móvil, tablet y escritorio
- ✅ **Animaciones Suaves** - Transiciones y efectos visuales modernos

### 🔍 Funcionalidades Avanzadas
- ✅ **Búsqueda y Filtrado** - Encuentra registros rápidamente
- ✅ **Validación de Datos** - Validación en tiempo real de formularios
- ✅ **Ordenamiento Automático** - Registros ordenados por fecha
- ✅ **Persistencia Local** - Datos guardados en el navegador

### 📤 Exportación de Datos
- ✅ **Exportar a CSV** - Descarga todos tus datos en formato CSV
- ✅ **Copiar a Google Sheets** - Copia datos al portapapeles para Google Sheets
- ✅ **Eliminación Masiva** - Opción para limpiar todos los datos

### ♿ Accesibilidad
- ✅ **Etiquetas ARIA** - Soporte completo para lectores de pantalla
- ✅ **Navegación por Teclado** - Totalmente navegable con teclado
- ✅ **Semantic HTML5** - Estructura semántica para mejor accesibilidad

## 🚀 Instalación y Uso

### Requisitos Previos
- Un navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere servidor ni instalación adicional

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/PuchuvoRed/contabilidad-lotto.git
   ```

2. **Navega al directorio:**
   ```bash
   cd contabilidad-lotto
   ```

3. **Abre el archivo en tu navegador:**
   - Haz doble clic en `index.html`, o
   - Arrastra `index.html` a tu navegador, o
   - Usa un servidor local (opcional)

### Uso Rápido

1. **Registrar una Venta:**
   - Ve a la pestaña "📊 Ventas"
   - Completa descripción, monto y fecha
   - Haz clic en "✅ Agregar Venta"

2. **Registrar un Gasto:**
   - Ve a la pestaña "💸 Gastos"
   - Completa la información del gasto
   - Haz clic en "✅ Agregar Gasto"

3. **Pagar Nómina:**
   - Ve a la pestaña "👥 Nómina"
   - Ingresa nombre del empleado y monto
   - Haz clic en "✅ Registrar Pago"

4. **Ver Reportes:**
   - Ve a la pestaña "📈 Reportes"
   - Visualiza el resumen financiero
   - Exporta datos si lo necesitas

## 📁 Estructura del Proyecto

```
contabilidad-lotto/
├── index.html              # Archivo HTML principal
├── css/
│   └── styles.css          # Estilos CSS con soporte de temas
├── js/
│   └── app.js              # Lógica JavaScript modular
├── assets/                 # (Recursos adicionales si los hay)
└── README.md               # Este archivo
```

## 🎯 Funcionalidades Detalladas

### Gestión de Ventas
- Registro de ventas con descripción, monto y fecha
- Búsqueda en tiempo real
- Visualización ordenada por fecha
- Eliminación individual de registros

### Gestión de Gastos
- Registro de gastos diarios
- Categorización y búsqueda
- Control total de gastos operativos

### Gestión de Nómina
- Registro de pagos a empleados
- Histórico de pagos
- Cálculo automático en reportes

### Gastos Fijos
- Registro de costos mensuales recurrentes
- Sin necesidad de fecha (gastos fijos)
- Impacto en reportes financieros

### Reportes
- **Total de Ventas** - Suma de todas las ventas
- **Gastos Diarios** - Suma de gastos operativos
- **Nómina Total** - Suma de pagos a empleados
- **Gastos Fijos** - Suma de costos fijos
- **Ganancia/Pérdida Neta** - Cálculo automático

## 💾 Almacenamiento de Datos

### LocalStorage
Los datos se almacenan localmente en tu navegador usando `localStorage`:
- ✅ No requiere conexión a internet
- ✅ Los datos persisten entre sesiones
- ✅ Sin envío de datos a servidores externos
- ⚠️ Los datos se vinculan al navegador y dominio

### Respaldo de Datos
**Importante:** Para mantener tus datos seguros:

1. **No borres el caché del navegador** del sitio
2. **Exporta regularmente** tus datos a CSV
3. **Mantén copias de seguridad** de tus archivos CSV

### Recuperación de Datos
Si pierdes tus datos:
- No hay forma de recuperarlos si limpias el navegador
- Por eso es importante exportar regularmente

## 🌓 Modo Claro/Oscuro

Cambia entre temas haciendo clic en el botón en la esquina superior derecha:
- 🌙 **Modo Oscuro** - Perfecto para trabajar de noche
- ☀️ **Modo Claro** - Ideal para ambientes iluminados

El tema seleccionado se guarda automáticamente.

## 📱 Responsive Design

La aplicación se adapta perfectamente a cualquier tamaño de pantalla:
- **Móvil** (< 480px) - Diseño vertical optimizado
- **Tablet** (481px - 768px) - Diseño adaptativo
- **Escritorio** (> 768px) - Diseño completo

## 🔒 Seguridad

### Medidas de Seguridad Implementadas
- ✅ Content Security Policy (CSP)
- ✅ Escape de HTML para prevenir XSS
- ✅ Validación de entradas
- ✅ Sin dependencias externas maliciosas
- ✅ Sin envío de datos a servidores

### Privacidad
- Todos los datos se almacenan **localmente** en tu navegador
- **No se envía información** a ningún servidor
- **No hay tracking** ni analíticas
- **100% Privado** y offline

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript (Vanilla)** - Sin frameworks, código puro
- **LocalStorage API** - Persistencia de datos
- **Clipboard API** - Copiar a portapapeles
- **Blob API** - Exportación de archivos

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #667eea;
    --primary-dark: #764ba2;
    /* ... más variables */
}
```

### Modificar Funcionalidad
El código está organizado en módulos en `js/app.js`:
- `DataManager` - Gestión de datos
- `UIManager` - Gestión de interfaz
- `Validator` - Validaciones
- `ExportManager` - Exportación de datos

## 📊 Casos de Uso

### Pequeños Negocios
Perfecto para:
- Tiendas de barrio
- Negocios de lotería
- Pequeños comercios
- Emprendedores individuales

### Uso Personal
Ideal para:
- Control de finanzas personales
- Gestión de gastos del hogar
- Tracking de ingresos y egresos

## 🐛 Solución de Problemas

### Los datos desaparecieron
- Verifica que no hayas limpiado el caché del navegador
- Revisa si estás usando el mismo navegador y modo (normal/incógnito)
- Restaura desde tu último backup CSV

### No puedo exportar a CSV
- Verifica que tu navegador permita descargas
- Comprueba que tengas espacio en disco
- Intenta con otro navegador

### El tema no se guarda
- Verifica que el navegador permita localStorage
- Comprueba que no estés en modo incógnito

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales o comerciales.

## 👨‍💻 Autor

**PuchuvoRed**
- GitHub: [@PuchuvoRed](https://github.com/PuchuvoRed)

## 🙏 Agradecimientos

- A todos los que usan y mejoran este proyecto
- A la comunidad de código abierto

## 📧 Soporte

Si tienes preguntas o necesitas ayuda:
- Abre un [Issue](https://github.com/PuchuvoRed/contabilidad-lotto/issues)
- Contacta al autor

---

**¡Empieza a gestionar tu contabilidad hoy!** 💰

Hecho con ❤️ por PuchuvoRed
