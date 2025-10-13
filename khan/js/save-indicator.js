function showSaveIndicator() {
    let indicator = document.getElementById('saveIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'saveIndicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(indicator);
    }

    indicator.textContent = '✓ Данные сохранены';
    indicator.style.opacity = '1';
    indicator.style.transform = 'translateY(0)';

    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(100px)';
    }, 3000);
}