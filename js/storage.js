// storage.js - Gestión de datos en localStorage

const Storage = {
    // Inicializar almacenamiento
    init() {
        if (!localStorage.getItem('ventas')) {
            localStorage.setItem('ventas', JSON.stringify([]));
        }
        if (!localStorage.getItem('gastos')) {
            localStorage.setItem('gastos', JSON.stringify([]));
        }
        if (!localStorage.getItem('nomina')) {
            localStorage.setItem('nomina', JSON.stringify([]));
        }
        if (!localStorage.getItem('fijos')) {
            localStorage.setItem('fijos', JSON.stringify([]));
        }
    },

    // Obtener datos
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            console.error(`Error al obtener ${key}:`, error);
            return [];
        }
    },

    // Guardar datos
    set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error al guardar ${key}:`, error);
            return false;
        }
    },

    // Agregar nuevo registro
    add(key, item) {
        const data = this.get(key);
        item.id = Date.now();
        data.push(item);
        return this.set(key, data);
    },

    // Actualizar registro existente
    update(key, id, updatedItem) {
        let data = this.get(key);
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedItem };
            return this.set(key, data);
        }
        return false;
    },

    // Eliminar registro
    delete(key, id) {
        let data = this.get(key);
        data = data.filter(item => item.id !== id);
        return this.set(key, data);
    },

    // Limpiar todo
    clearAll() {
        localStorage.clear();
        this.init();
    }
};
