/**
 * Contabilidad Lotto - Main Application
 * Financial Management System with CRUD, localStorage, and Export features
 */

// ========================================
// Data Management Module
// ========================================

const DataManager = {
    /**
     * Initialize localStorage with empty arrays if not exists
     */
    initialize() {
        const keys = ['ventas', 'gastos', 'nomina', 'fijos'];
        keys.forEach(key => {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify([]));
            }
        });
        
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        ThemeManager.setTheme(savedTheme);
    },

    /**
     * Get data from localStorage
     * @param {string} key - The storage key
     * @returns {Array} The data array
     */
    getData(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            console.error(`Error reading ${key}:`, error);
            return [];
        }
    },

    /**
     * Save data to localStorage
     * @param {string} key - The storage key
     * @param {Array} data - The data to save
     */
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
            alert('Error al guardar los datos. El almacenamiento puede estar lleno.');
            return false;
        }
    },

    /**
     * Add item to data array
     * @param {string} key - The storage key
     * @param {Object} item - The item to add
     */
    addItem(key, item) {
        const data = this.getData(key);
        data.push({...item, id: Date.now()});
        return this.saveData(key, data);
    },

    /**
     * Delete item from data array
     * @param {string} key - The storage key
     * @param {number} id - The item ID
     */
    deleteItem(key, id) {
        const data = this.getData(key);
        const filtered = data.filter(item => item.id !== id);
        return this.saveData(key, filtered);
    },

    /**
     * Clear all data
     */
    clearAll() {
        if (confirm('¿Estás seguro de que quieres eliminar TODOS los datos? Esta acción no se puede deshacer.')) {
            const keys = ['ventas', 'gastos', 'nomina', 'fijos'];
            keys.forEach(key => {
                localStorage.setItem(key, JSON.stringify([]));
            });
            UIManager.loadAll();
            alert('Todos los datos han sido eliminados.');
        }
    }
};

// ========================================
// Validation Module
// ========================================

const Validator = {
    /**
     * Validate text input
     * @param {string} value - The value to validate
     * @param {number} minLength - Minimum length
     * @returns {Object} Validation result
     */
    validateText(value, minLength = 3) {
        const trimmed = value.trim();
        if (!trimmed) {
            return { valid: false, message: 'Este campo es requerido' };
        }
        if (trimmed.length < minLength) {
            return { valid: false, message: `Debe tener al menos ${minLength} caracteres` };
        }
        return { valid: true };
    },

    /**
     * Validate number input
     * @param {string|number} value - The value to validate
     * @param {number} min - Minimum value
     * @returns {Object} Validation result
     */
    validateNumber(value, min = 0.01) {
        const num = parseFloat(value);
        if (isNaN(num)) {
            return { valid: false, message: 'Debe ser un número válido' };
        }
        if (num < min) {
            return { valid: false, message: `Debe ser mayor o igual a ${min}` };
        }
        return { valid: true };
    },

    /**
     * Validate date input
     * @param {string} value - The date value
     * @returns {Object} Validation result
     */
    validateDate(value) {
        if (!value) {
            return { valid: false, message: 'La fecha es requerida' };
        }
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return { valid: false, message: 'Fecha inválida' };
        }
        return { valid: true };
    },

    /**
     * Show validation message
     * @param {HTMLElement} input - The input element
     * @param {boolean} isValid - Validation status
     * @param {string} message - Error message
     */
    showValidation(input, isValid, message = '') {
        input.classList.remove('valid', 'invalid');
        const messageEl = input.nextElementSibling;
        
        if (isValid) {
            input.classList.add('valid');
            if (messageEl && messageEl.classList.contains('validation-message')) {
                messageEl.classList.remove('show');
            }
        } else {
            input.classList.add('invalid');
            if (messageEl && messageEl.classList.contains('validation-message')) {
                messageEl.textContent = message;
                messageEl.classList.add('show');
            }
        }
    }
};

// ========================================
// Theme Manager
// ========================================

const ThemeManager = {
    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        const body = document.body;
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    /**
     * Set specific theme
     * @param {string} theme - 'light' or 'dark'
     */
    setTheme(theme) {
        const body = document.body;
        const themeBtn = document.getElementById('theme-toggle');
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            if (themeBtn) themeBtn.textContent = '☀️ Modo Claro';
        } else {
            body.classList.remove('dark-theme');
            if (themeBtn) themeBtn.textContent = '🌙 Modo Oscuro';
        }
        
        localStorage.setItem('theme', theme);
    }
};

// ========================================
// UI Manager
// ========================================

const UIManager = {
    currentTab: 'ventas',
    searchTerms: {},

    /**
     * Initialize UI
     */
    initialize() {
        this.setTodayDates();
        this.loadAll();
        this.attachEventListeners();
    },

    /**
     * Set today's date on all date inputs
     */
    setTodayDates() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = ['venta-fecha', 'gasto-fecha', 'nomina-fecha'];
        dateInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = today;
        });
    },

    /**
     * Switch between tabs
     * @param {string} tabName - Name of the tab to show
     */
    switchTab(tabName) {
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(el => {
            el.classList.remove('active');
        });
        document.getElementById(tabName)?.classList.add('active');

        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(el => {
            el.classList.remove('active');
        });
        event?.target?.classList.add('active');

        this.currentTab = tabName;

        // Load specific data or reports
        if (tabName === 'reportes') {
            this.updateReports();
        }
    },

    /**
     * Load all data
     */
    loadAll() {
        this.loadVentas();
        this.loadGastos();
        this.loadNomina();
        this.loadFijos();
        if (this.currentTab === 'reportes') {
            this.updateReports();
        }
    },

    /**
     * Filter records based on search term
     * @param {Array} records - Records to filter
     * @param {string} searchTerm - Search term
     * @returns {Array} Filtered records
     */
    filterRecords(records, searchTerm) {
        if (!searchTerm) return records;
        
        const term = searchTerm.toLowerCase();
        return records.filter(record => {
            const description = (record.descripcion || record.empleado || '').toLowerCase();
            const date = (record.fecha || '').toLowerCase();
            const amount = (record.monto || '').toString();
            
            return description.includes(term) || 
                   date.includes(term) || 
                   amount.includes(term);
        });
    },

    /**
     * Load and display ventas
     */
    loadVentas() {
        const ventas = DataManager.getData('ventas');
        const searchTerm = this.searchTerms['ventas'] || '';
        const filtered = this.filterRecords(ventas, searchTerm);
        const lista = document.getElementById('ventas-list');
        
        if (!lista) return;
        
        lista.innerHTML = '';
        
        if (filtered.length === 0) {
            lista.innerHTML = '<div class="no-records">📝 No hay ventas registradas</div>';
            return;
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        filtered.forEach(venta => {
            lista.innerHTML += `
                <div class="record-item" role="article">
                    <div class="record-info">
                        <div class="record-description">${this.escapeHtml(venta.descripcion)}</div>
                        <div class="record-date">📅 ${venta.fecha}</div>
                    </div>
                    <div class="record-amount">RD$ ${venta.monto.toFixed(2)}</div>
                    <button class="btn-delete" onclick="VentasManager.delete(${venta.id})" aria-label="Eliminar venta">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });
    },

    /**
     * Load and display gastos
     */
    loadGastos() {
        const gastos = DataManager.getData('gastos');
        const searchTerm = this.searchTerms['gastos'] || '';
        const filtered = this.filterRecords(gastos, searchTerm);
        const lista = document.getElementById('gastos-list');
        
        if (!lista) return;
        
        lista.innerHTML = '';
        
        if (filtered.length === 0) {
            lista.innerHTML = '<div class="no-records">📝 No hay gastos registrados</div>';
            return;
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        filtered.forEach(gasto => {
            lista.innerHTML += `
                <div class="record-item" role="article">
                    <div class="record-info">
                        <div class="record-description">${this.escapeHtml(gasto.descripcion)}</div>
                        <div class="record-date">📅 ${gasto.fecha}</div>
                    </div>
                    <div class="record-amount">RD$ ${gasto.monto.toFixed(2)}</div>
                    <button class="btn-delete" onclick="GastosManager.delete(${gasto.id})" aria-label="Eliminar gasto">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });
    },

    /**
     * Load and display nomina
     */
    loadNomina() {
        const nomina = DataManager.getData('nomina');
        const searchTerm = this.searchTerms['nomina'] || '';
        const filtered = this.filterRecords(nomina, searchTerm);
        const lista = document.getElementById('nomina-list');
        
        if (!lista) return;
        
        lista.innerHTML = '';
        
        if (filtered.length === 0) {
            lista.innerHTML = '<div class="no-records">📝 No hay pagos de nómina registrados</div>';
            return;
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        filtered.forEach(pago => {
            lista.innerHTML += `
                <div class="record-item" role="article">
                    <div class="record-info">
                        <div class="record-description">👤 ${this.escapeHtml(pago.empleado)}</div>
                        <div class="record-date">📅 ${pago.fecha}</div>
                    </div>
                    <div class="record-amount">RD$ ${pago.monto.toFixed(2)}</div>
                    <button class="btn-delete" onclick="NominaManager.delete(${pago.id})" aria-label="Eliminar pago">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });
    },

    /**
     * Load and display fixed costs
     */
    loadFijos() {
        const fijos = DataManager.getData('fijos');
        const searchTerm = this.searchTerms['fijos'] || '';
        const filtered = this.filterRecords(fijos, searchTerm);
        const lista = document.getElementById('fijos-list');
        
        if (!lista) return;
        
        lista.innerHTML = '';
        
        if (filtered.length === 0) {
            lista.innerHTML = '<div class="no-records">📝 No hay gastos fijos registrados</div>';
            return;
        }

        filtered.forEach(fijo => {
            lista.innerHTML += `
                <div class="record-item" role="article">
                    <div class="record-info">
                        <div class="record-description">${this.escapeHtml(fijo.descripcion)}</div>
                        <div class="record-date">💼 Gasto mensual</div>
                    </div>
                    <div class="record-amount">RD$ ${fijo.monto.toFixed(2)}</div>
                    <button class="btn-delete" onclick="FijosManager.delete(${fijo.id})" aria-label="Eliminar gasto fijo">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
        });
    },

    /**
     * Update financial reports
     */
    updateReports() {
        const ventas = DataManager.getData('ventas');
        const gastos = DataManager.getData('gastos');
        const nomina = DataManager.getData('nomina');
        const fijos = DataManager.getData('fijos');

        const totalVentas = ventas.reduce((sum, v) => sum + v.monto, 0);
        const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);
        const totalNomina = nomina.reduce((sum, n) => sum + n.monto, 0);
        const totalFijos = fijos.reduce((sum, f) => sum + f.monto, 0);
        const ganancia = totalVentas - (totalGastos + totalNomina + totalFijos);

        const html = `
            <div class="summary-card positive" role="region" aria-label="Total de ventas">
                <h3>💰 Total Ventas</h3>
                <div class="amount">RD$ ${totalVentas.toFixed(2)}</div>
            </div>
            <div class="summary-card negative" role="region" aria-label="Total de gastos diarios">
                <h3>💸 Gastos Diarios</h3>
                <div class="amount">RD$ ${totalGastos.toFixed(2)}</div>
            </div>
            <div class="summary-card negative" role="region" aria-label="Total de nómina">
                <h3>👥 Nómina Total</h3>
                <div class="amount">RD$ ${totalNomina.toFixed(2)}</div>
            </div>
            <div class="summary-card negative" role="region" aria-label="Total de gastos fijos">
                <h3>🏢 Gastos Fijos</h3>
                <div class="amount">RD$ ${totalFijos.toFixed(2)}</div>
            </div>
            <div class="summary-card ${ganancia >= 0 ? 'positive' : 'negative'}" role="region" aria-label="${ganancia >= 0 ? 'Ganancia neta' : 'Pérdida'}">
                <h3>${ganancia >= 0 ? '📈 Ganancia Neta' : '📉 Pérdida'}</h3>
                <div class="amount">RD$ ${ganancia.toFixed(2)}</div>
            </div>
        `;

        const container = document.getElementById('resumen-cards');
        if (container) {
            container.innerHTML = html;
        }
    },

    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Attach event listeners for search functionality
     */
    attachEventListeners() {
        // Search inputs
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const section = e.target.dataset.section;
                this.searchTerms[section] = e.target.value;
                
                switch(section) {
                    case 'ventas': this.loadVentas(); break;
                    case 'gastos': this.loadGastos(); break;
                    case 'nomina': this.loadNomina(); break;
                    case 'fijos': this.loadFijos(); break;
                }
            });
        });
    }
};

// ========================================
// Section-specific Managers
// ========================================

const VentasManager = {
    add(event) {
        event.preventDefault();
        
        const descripcion = document.getElementById('venta-desc').value;
        const monto = document.getElementById('venta-monto').value;
        const fecha = document.getElementById('venta-fecha').value;

        // Validate inputs
        const descValidation = Validator.validateText(descripcion);
        const montoValidation = Validator.validateNumber(monto);
        const fechaValidation = Validator.validateDate(fecha);

        if (!descValidation.valid || !montoValidation.valid || !fechaValidation.valid) {
            if (!descValidation.valid) alert(descValidation.message);
            else if (!montoValidation.valid) alert(montoValidation.message);
            else if (!fechaValidation.valid) alert(fechaValidation.message);
            return;
        }

        const venta = {
            descripcion: descripcion.trim(),
            monto: parseFloat(monto),
            fecha
        };

        if (DataManager.addItem('ventas', venta)) {
            UIManager.loadVentas();
            document.querySelector('#ventas form').reset();
            UIManager.setTodayDates();
        }
    },

    delete(id) {
        if (confirm('¿Eliminar esta venta?')) {
            DataManager.deleteItem('ventas', id);
            UIManager.loadVentas();
        }
    }
};

const GastosManager = {
    add(event) {
        event.preventDefault();
        
        const descripcion = document.getElementById('gasto-desc').value;
        const monto = document.getElementById('gasto-monto').value;
        const fecha = document.getElementById('gasto-fecha').value;

        // Validate inputs
        const descValidation = Validator.validateText(descripcion);
        const montoValidation = Validator.validateNumber(monto);
        const fechaValidation = Validator.validateDate(fecha);

        if (!descValidation.valid || !montoValidation.valid || !fechaValidation.valid) {
            if (!descValidation.valid) alert(descValidation.message);
            else if (!montoValidation.valid) alert(montoValidation.message);
            else if (!fechaValidation.valid) alert(fechaValidation.message);
            return;
        }

        const gasto = {
            descripcion: descripcion.trim(),
            monto: parseFloat(monto),
            fecha
        };

        if (DataManager.addItem('gastos', gasto)) {
            UIManager.loadGastos();
            document.querySelector('#gastos form').reset();
            UIManager.setTodayDates();
        }
    },

    delete(id) {
        if (confirm('¿Eliminar este gasto?')) {
            DataManager.deleteItem('gastos', id);
            UIManager.loadGastos();
        }
    }
};

const NominaManager = {
    add(event) {
        event.preventDefault();
        
        const empleado = document.getElementById('nomina-empleado').value;
        const monto = document.getElementById('nomina-monto').value;
        const fecha = document.getElementById('nomina-fecha').value;

        // Validate inputs
        const empValidation = Validator.validateText(empleado);
        const montoValidation = Validator.validateNumber(monto);
        const fechaValidation = Validator.validateDate(fecha);

        if (!empValidation.valid || !montoValidation.valid || !fechaValidation.valid) {
            if (!empValidation.valid) alert(empValidation.message);
            else if (!montoValidation.valid) alert(montoValidation.message);
            else if (!fechaValidation.valid) alert(fechaValidation.message);
            return;
        }

        const pago = {
            empleado: empleado.trim(),
            monto: parseFloat(monto),
            fecha
        };

        if (DataManager.addItem('nomina', pago)) {
            UIManager.loadNomina();
            document.querySelector('#nomina form').reset();
            UIManager.setTodayDates();
        }
    },

    delete(id) {
        if (confirm('¿Eliminar este pago de nómina?')) {
            DataManager.deleteItem('nomina', id);
            UIManager.loadNomina();
        }
    }
};

const FijosManager = {
    add(event) {
        event.preventDefault();
        
        const descripcion = document.getElementById('fijo-desc').value;
        const monto = document.getElementById('fijo-monto').value;

        // Validate inputs
        const descValidation = Validator.validateText(descripcion);
        const montoValidation = Validator.validateNumber(monto);

        if (!descValidation.valid || !montoValidation.valid) {
            if (!descValidation.valid) alert(descValidation.message);
            else if (!montoValidation.valid) alert(montoValidation.message);
            return;
        }

        const fijo = {
            descripcion: descripcion.trim(),
            monto: parseFloat(monto)
        };

        if (DataManager.addItem('fijos', fijo)) {
            UIManager.loadFijos();
            document.querySelector('#fijos form').reset();
        }
    },

    delete(id) {
        if (confirm('¿Eliminar este gasto fijo?')) {
            DataManager.deleteItem('fijos', id);
            UIManager.loadFijos();
        }
    }
};

// ========================================
// Export Module
// ========================================

const ExportManager = {
    /**
     * Export all data to CSV file
     */
    toCSV() {
        const ventas = DataManager.getData('ventas');
        const gastos = DataManager.getData('gastos');
        const nomina = DataManager.getData('nomina');
        const fijos = DataManager.getData('fijos');

        let csv = 'TIPO,DESCRIPCIÓN,MONTO,FECHA\n';

        ventas.forEach(v => {
            csv += `VENTA,"${v.descripcion}",${v.monto},${v.fecha}\n`;
        });
        gastos.forEach(g => {
            csv += `GASTO,"${g.descripcion}",${g.monto},${g.fecha}\n`;
        });
        nomina.forEach(n => {
            csv += `NOMINA,"${n.empleado}",${n.monto},${n.fecha}\n`;
        });
        fijos.forEach(f => {
            csv += `FIJO,"${f.descripcion}",${f.monto},\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Contabilidad_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    /**
     * Copy data to clipboard for Google Sheets
     */
    toClipboard() {
        const ventas = DataManager.getData('ventas');
        const gastos = DataManager.getData('gastos');
        const nomina = DataManager.getData('nomina');
        const fijos = DataManager.getData('fijos');

        let texto = 'TIPO\tDESCRIPCIÓN\tMONTO\tFECHA\n';

        ventas.forEach(v => {
            texto += `VENTA\t${v.descripcion}\t${v.monto}\t${v.fecha}\n`;
        });
        gastos.forEach(g => {
            texto += `GASTO\t${g.descripcion}\t${g.monto}\t${g.fecha}\n`;
        });
        nomina.forEach(n => {
            texto += `NOMINA\t${n.empleado}\t${n.monto}\t${n.fecha}\n`;
        });
        fijos.forEach(f => {
            texto += `FIJO\t${f.descripcion}\t${f.monto}\t\n`;
        });

        navigator.clipboard.writeText(texto).then(() => {
            alert('✅ Datos copiados al portapapeles. Ahora pégalos en Google Sheets (Ctrl+V)');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            alert('❌ Error al copiar al portapapeles. Intenta de nuevo.');
        });
    }
};

// ========================================
// Mobile Menu Handler
// ========================================

const MobileMenu = {
    toggle() {
        const tabs = document.querySelector('.tabs');
        tabs?.classList.toggle('mobile-hidden');
    }
};

// ========================================
// Initialize Application
// ========================================

window.addEventListener('load', () => {
    DataManager.initialize();
    UIManager.initialize();
});
