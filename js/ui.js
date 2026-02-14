// ui.js - Actualización de la interfaz de usuario

const UI = {
    // Cambiar pestañas
    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
        
        const tabContent = document.getElementById(tabName);
        if (tabContent) {
            tabContent.classList.add('active');
        }
        
        // Encontrar y activar el botón correcto
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            }
        });
        
        if (tabName === 'reportes') {
            this.updateReports();
        }
    },

    // Renderizar lista de registros
    renderRecords(containerId, records, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        if (records.length === 0) {
            container.innerHTML = '<div class="no-records">No hay registros</div>';
            return;
        }

        records.forEach(record => {
            const recordDiv = document.createElement('div');
            recordDiv.className = 'record-item';
            recordDiv.setAttribute('data-id', record.id);
            recordDiv.setAttribute('data-type', type);
            recordDiv.innerHTML = this.getRecordHTML(record, type);
            container.appendChild(recordDiv);
        });
    },

    // Generar HTML para un registro
    getRecordHTML(record, type) {
        const description = type === 'nomina' ? `👤 ${this.escapeHtml(record.empleado)}` : this.escapeHtml(record.descripcion);
        const dateText = record.fecha || 'Gasto Mensual';
        
        return `
            <div class="record-info">
                <div class="record-description">${description}</div>
                <div class="record-date">${dateText}</div>
            </div>
            <div class="record-amount">RD$ ${this.formatCurrency(record.monto)}</div>
            <button class="btn-edit" data-action="edit">✏️</button>
            <button class="btn-delete" data-action="delete">🗑️</button>
        `;
    },

    // Escape HTML para prevenir XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Formatear moneda
    formatCurrency(amount) {
        return parseFloat(amount).toFixed(2);
    },

    // Actualizar reportes
    updateReports() {
        const ventas = Storage.get('ventas');
        const gastos = Storage.get('gastos');
        const nomina = Storage.get('nomina');
        const fijos = Storage.get('fijos');

        const totalVentas = ventas.reduce((sum, v) => sum + parseFloat(v.monto), 0);
        const totalGastos = gastos.reduce((sum, g) => sum + parseFloat(g.monto), 0);
        const totalNomina = nomina.reduce((sum, n) => sum + parseFloat(n.monto), 0);
        const totalFijos = fijos.reduce((sum, f) => sum + parseFloat(f.monto), 0);
        const totalGastosAll = totalGastos + totalNomina + totalFijos;
        const ganancia = totalVentas - totalGastosAll;

        const html = `
            <div class="summary-card positive">
                <h3>💰 Total Ventas</h3>
                <div class="amount">RD$ ${this.formatCurrency(totalVentas)}</div>
            </div>
            <div class="summary-card negative">
                <h3>💸 Gastos Diarios</h3>
                <div class="amount">RD$ ${this.formatCurrency(totalGastos)}</div>
            </div>
            <div class="summary-card negative">
                <h3>👥 Nómina Total</h3>
                <div class="amount">RD$ ${this.formatCurrency(totalNomina)}</div>
            </div>
            <div class="summary-card negative">
                <h3>🏢 Gastos Fijos</h3>
                <div class="amount">RD$ ${this.formatCurrency(totalFijos)}</div>
            </div>
            <div class="summary-card ${ganancia >= 0 ? 'positive' : 'negative'}">
                <h3>${ganancia >= 0 ? '📈 Ganancia Neta' : '📉 Pérdida'}</h3>
                <div class="amount">RD$ ${this.formatCurrency(ganancia)}</div>
            </div>
        `;

        const container = document.getElementById('resumen-cards');
        if (container) {
            container.innerHTML = html;
        }
    },

    // Establecer fecha actual en inputs
    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInputs = ['venta-fecha', 'gasto-fecha', 'nomina-fecha'];
        
        dateInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input && !input.value) {
                input.value = today;
            }
        });
    },

    // Mostrar mensaje de éxito
    showSuccess(message) {
        alert('✅ ' + message);
    },

    // Mostrar mensaje de error
    showError(message) {
        alert('❌ ' + message);
    },

    // Limpiar formulario
    clearForm(formId) {
        const form = document.querySelector(`#${formId} form`);
        if (form) {
            form.reset();
            this.setTodayDate();
        }
    }
};
