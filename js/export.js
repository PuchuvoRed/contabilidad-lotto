// export.js - Funcionalidad de exportación de datos

const ExportData = {
    // Sanitizar datos para prevenir CSV injection
    sanitizeCSV(value) {
        if (!value) return '';
        const str = String(value);
        // Si comienza con caracteres peligrosos, agregar un espacio
        if (str.match(/^[=+\-@]/)) {
            return ' ' + str;
        }
        return str;
    },

    // Exportar a CSV
    toCSV() {
        const ventas = Storage.get('ventas');
        const gastos = Storage.get('gastos');
        const nomina = Storage.get('nomina');
        const fijos = Storage.get('fijos');

        let csv = 'TIPO,DESCRIPCIÓN,MONTO,FECHA\n';

        // Agregar ventas
        ventas.forEach(v => {
            csv += `VENTA,"${this.sanitizeCSV(v.descripcion)}",${v.monto},${v.fecha}\n`;
        });

        // Agregar gastos
        gastos.forEach(g => {
            csv += `GASTO,"${this.sanitizeCSV(g.descripcion)}",${g.monto},${g.fecha}\n`;
        });

        // Agregar nómina
        nomina.forEach(n => {
            csv += `NOMINA,"${this.sanitizeCSV(n.empleado)}",${n.monto},${n.fecha}\n`;
        });

        // Agregar gastos fijos
        fijos.forEach(f => {
            csv += `FIJO,"${this.sanitizeCSV(f.descripcion)}",${f.monto},\n`;
        });

        return csv;
    },

    // Descargar CSV
    downloadCSV() {
        try {
            const csv = this.toCSV();
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            const fileName = `Contabilidad_${new Date().toISOString().split('T')[0]}.csv`;
            
            link.href = url;
            link.download = fileName;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(url);
            
            UI.showSuccess('Archivo CSV descargado exitosamente');
        } catch (error) {
            console.error('Error al descargar CSV:', error);
            UI.showError('Error al descargar el archivo CSV');
        }
    },

    // Copiar al portapapeles (formato Google Sheets)
    copyToClipboard() {
        try {
            const ventas = Storage.get('ventas');
            const gastos = Storage.get('gastos');
            const nomina = Storage.get('nomina');
            const fijos = Storage.get('fijos');

            let texto = 'TIPO\tDESCRIPCIÓN\tMONTO\tFECHA\n';

            // Agregar ventas
            ventas.forEach(v => {
                texto += `VENTA\t${this.sanitizeCSV(v.descripcion)}\t${v.monto}\t${v.fecha}\n`;
            });

            // Agregar gastos
            gastos.forEach(g => {
                texto += `GASTO\t${this.sanitizeCSV(g.descripcion)}\t${g.monto}\t${g.fecha}\n`;
            });

            // Agregar nómina
            nomina.forEach(n => {
                texto += `NOMINA\t${this.sanitizeCSV(n.empleado)}\t${n.monto}\t${n.fecha}\n`;
            });

            // Agregar gastos fijos
            fijos.forEach(f => {
                texto += `FIJO\t${this.sanitizeCSV(f.descripcion)}\t${f.monto}\t\n`;
            });

            // Copiar al portapapeles
            navigator.clipboard.writeText(texto).then(() => {
                UI.showSuccess('Datos copiados al portapapeles. Ahora pégalos en Google Sheets (Ctrl+V)');
            }).catch(err => {
                console.error('Error al copiar:', err);
                UI.showError('Error al copiar los datos');
            });
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
            UI.showError('Error al copiar los datos');
        }
    }
};
