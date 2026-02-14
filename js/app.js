// app.js - Lógica principal de la aplicación

const App = {
    // Inicializar aplicación
    init() {
        Storage.init();
        UI.setTodayDate();
        this.loadAll();
        this.setupEventListeners();
    },

    // Configurar event listeners
    setupEventListeners() {
        // Botones de pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.getAttribute('data-tab');
                UI.switchTab(tab);
            });
        });
    },

    // Validar datos del formulario
    validateForm(data) {
        // Validar que todos los campos requeridos estén presentes
        for (const key in data) {
            if (data[key] === '' || data[key] === null || data[key] === undefined) {
                return { valid: false, message: 'Todos los campos son obligatorios' };
            }
        }

        // Validar monto
        if (data.monto && (isNaN(data.monto) || data.monto <= 0)) {
            return { valid: false, message: 'El monto debe ser un número mayor a 0' };
        }

        // Validar fecha si existe
        if (data.fecha) {
            const fecha = new Date(data.fecha);
            if (isNaN(fecha.getTime())) {
                return { valid: false, message: 'Fecha inválida' };
            }
        }

        return { valid: true };
    },

    // VENTAS
    addVenta(e) {
        e.preventDefault();
        
        const venta = {
            descripcion: document.getElementById('venta-desc').value.trim(),
            monto: parseFloat(document.getElementById('venta-monto').value),
            fecha: document.getElementById('venta-fecha').value
        };

        const validation = this.validateForm(venta);
        if (!validation.valid) {
            UI.showError(validation.message);
            return;
        }

        if (Storage.add('ventas', venta)) {
            this.loadVentas();
            UI.clearForm('ventas');
            UI.showSuccess('Venta agregada correctamente');
        } else {
            UI.showError('Error al agregar la venta');
        }
    },

    loadVentas() {
        const ventas = Storage.get('ventas');
        UI.renderRecords('ventas-list', ventas, 'ventas');
    },

    // GASTOS
    addGasto(e) {
        e.preventDefault();
        
        const gasto = {
            descripcion: document.getElementById('gasto-desc').value.trim(),
            monto: parseFloat(document.getElementById('gasto-monto').value),
            fecha: document.getElementById('gasto-fecha').value
        };

        const validation = this.validateForm(gasto);
        if (!validation.valid) {
            UI.showError(validation.message);
            return;
        }

        if (Storage.add('gastos', gasto)) {
            this.loadGastos();
            UI.clearForm('gastos');
            UI.showSuccess('Gasto agregado correctamente');
        } else {
            UI.showError('Error al agregar el gasto');
        }
    },

    loadGastos() {
        const gastos = Storage.get('gastos');
        UI.renderRecords('gastos-list', gastos, 'gastos');
    },

    // NÓMINA
    addNomina(e) {
        e.preventDefault();
        
        const nomina = {
            empleado: document.getElementById('nomina-empleado').value.trim(),
            monto: parseFloat(document.getElementById('nomina-monto').value),
            fecha: document.getElementById('nomina-fecha').value
        };

        const validation = this.validateForm(nomina);
        if (!validation.valid) {
            UI.showError(validation.message);
            return;
        }

        if (Storage.add('nomina', nomina)) {
            this.loadNomina();
            UI.clearForm('nomina');
            UI.showSuccess('Pago de nómina registrado correctamente');
        } else {
            UI.showError('Error al registrar el pago');
        }
    },

    loadNomina() {
        const nomina = Storage.get('nomina');
        UI.renderRecords('nomina-list', nomina, 'nomina');
    },

    // GASTOS FIJOS
    addGastoFijo(e) {
        e.preventDefault();
        
        const fijo = {
            descripcion: document.getElementById('fijo-desc').value.trim(),
            monto: parseFloat(document.getElementById('fijo-monto').value)
        };

        const validation = this.validateForm(fijo);
        if (!validation.valid) {
            UI.showError(validation.message);
            return;
        }

        if (Storage.add('fijos', fijo)) {
            this.loadFijos();
            UI.clearForm('fijos');
            UI.showSuccess('Gasto fijo agregado correctamente');
        } else {
            UI.showError('Error al agregar el gasto fijo');
        }
    },

    loadFijos() {
        const fijos = Storage.get('fijos');
        UI.renderRecords('fijos-list', fijos, 'fijos');
    },

    // Editar registro
    editRecord(type, id) {
        const records = Storage.get(type);
        const record = records.find(r => r.id === id);
        
        if (!record) {
            UI.showError('Registro no encontrado');
            return;
        }

        // Llenar el formulario con los datos existentes
        if (type === 'ventas') {
            document.getElementById('venta-desc').value = record.descripcion;
            document.getElementById('venta-monto').value = record.monto;
            document.getElementById('venta-fecha').value = record.fecha;
        } else if (type === 'gastos') {
            document.getElementById('gasto-desc').value = record.descripcion;
            document.getElementById('gasto-monto').value = record.monto;
            document.getElementById('gasto-fecha').value = record.fecha;
        } else if (type === 'nomina') {
            document.getElementById('nomina-empleado').value = record.empleado;
            document.getElementById('nomina-monto').value = record.monto;
            document.getElementById('nomina-fecha').value = record.fecha;
        } else if (type === 'fijos') {
            document.getElementById('fijo-desc').value = record.descripcion;
            document.getElementById('fijo-monto').value = record.monto;
        }

        // Eliminar el registro antiguo
        this.deleteRecord(type, id, true);
    },

    // Eliminar registro
    deleteRecord(type, id, skipConfirm = false) {
        if (!skipConfirm && !confirm('¿Estás seguro de que deseas eliminar este registro?')) {
            return;
        }

        if (Storage.delete(type, id)) {
            this.loadByType(type);
            if (!skipConfirm) {
                UI.showSuccess('Registro eliminado correctamente');
            }
        } else {
            UI.showError('Error al eliminar el registro');
        }
    },

    // Cargar registros por tipo
    loadByType(type) {
        switch(type) {
            case 'ventas':
                this.loadVentas();
                break;
            case 'gastos':
                this.loadGastos();
                break;
            case 'nomina':
                this.loadNomina();
                break;
            case 'fijos':
                this.loadFijos();
                break;
        }
    },

    // Cargar todos los registros
    loadAll() {
        this.loadVentas();
        this.loadGastos();
        this.loadNomina();
        this.loadFijos();
    }
};

// Inicializar cuando se carga la página
window.addEventListener('DOMContentLoaded', () => {
    App.init();
});
