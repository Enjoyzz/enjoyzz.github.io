class StorageManager {
    constructor() {
        this.storageKey = 'calculatorData';
        this.debounceTime = 500;
        this.timeoutId = null;
        this.init();
    }

    init() {
        this.load();
        this.bindEvents();
    }

    save() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            try {
                const data = this.collectData();
                localStorage.setItem(this.storageKey, JSON.stringify(data));
                this.showSaveIndicator();
            } catch (error) {
                console.error('Ошибка сохранения:', error);
            }
        }, this.debounceTime);
    }

    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const data = JSON.parse(saved);
                this.applyData(data);
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    }

    collectData() {
        const data = {};
        document.querySelectorAll('input[type="number"].listen').forEach(input => {
            data[input.id] = input.value;
        });
        return data;
    }

    applyData(data) {
        Object.keys(data).forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.value = data[id];
            }
        });
        // Пересчитываем итоги после загрузки
        if (typeof calculateCharmTotals === 'function') calculateCharmTotals();
        if (typeof calculateIntimacyTotals === 'function') calculateIntimacyTotals();
    }

    bindEvents() {
        document.querySelectorAll('input[type="number"].listen').forEach(input => {
            input.addEventListener('input', () => this.save());
        });
    }

    showSaveIndicator() {
        // Можно добавить мигание "Сохранено" если нужно
        showSaveIndicator()
        console.log('✓ Данные сохранены');
    }

    clear() {
        localStorage.removeItem(this.storageKey);
    }
}

// Использование
const storageManager = new StorageManager();