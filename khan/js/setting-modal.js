const defaultFormulas = {
    charm: {
        blueHadak: 1.5,
        silverHairpin: 3,
        chests: 2.2,
        forage: 1.5
    },
    intimacy: {
        ordos: 1.5,
        sandalwoodBracelet: 3,
        forage: 1.2
    }
};


function loadFormulaSettings() {
    const saved = localStorage.getItem('formulaSettings');
    return saved ? JSON.parse(saved) : defaultFormulas;
}

// Сохранение настроек в localStorage
function saveFormulaSettings(settings) {
    localStorage.setItem('formulaSettings', JSON.stringify(settings));
    showSaveIndicator('✓ Данные формулы сохранены');
    console.log('✓ Данные формулы сохранены');
}

// Получение текущих настроек
function getFormulaSettings() {
    return loadFormulaSettings();
}

function closeModal () {
    document.getElementById('settings-modal').style.display = 'none';
}

document.getElementById('reset-settings').addEventListener('click', function() {
    if (confirm('Сбросить все настройки формул к значениям по умолчанию?')) {
        localStorage.removeItem('formulaSettings');

        // Пересчитываем
        calculateCharmTotals();
        calculateIntimacyTotals();
        drawFormulas();
        closeModal();
        showSaveIndicator('✓ Данные формулы сохранены');
    }
});

document.getElementById('settings-btn').addEventListener('click', function() {
    const formulas = getFormulaSettings();

    // Заполняем поля текущими значениями
    document.getElementById('blueHadak-multiplier').value = formulas.charm.blueHadak;
    document.getElementById('silverHairpin-multiplier').value = formulas.charm.silverHairpin;
    document.getElementById('chests-multiplier').value = formulas.charm.chests;
    document.getElementById('forage-charm-multiplier').value = formulas.charm.forage;
    document.getElementById('ordos-multiplier').value = formulas.intimacy.ordos;
    document.getElementById('sandalwoodBracelet-multiplier').value = formulas.intimacy.sandalwoodBracelet;
    document.getElementById('forage-intimacy-multiplier').value = formulas.intimacy.forage;

    document.getElementById('settings-modal').style.display = 'flex';
});

document.getElementById('cancel-settings').addEventListener('click', closeModal);

document.getElementById('save-settings').addEventListener('click', function() {
    const newFormulas = {
        charm: {
            blueHadak: parseFloat(document.getElementById('blueHadak-multiplier').value) || defaultFormulas.charm.blueHadak,
            silverHairpin: parseFloat(document.getElementById('silverHairpin-multiplier').value) || defaultFormulas.charm.silverHairpin,
            chests: parseFloat(document.getElementById('chests-multiplier').value) || defaultFormulas.charm.chests,
            forage: parseFloat(document.getElementById('forage-charm-multiplier').value) || defaultFormulas.charm.forage
        },
        intimacy: {
            ordos: parseFloat(document.getElementById('ordos-multiplier').value) || defaultFormulas.intimacy.ordos,
            sandalwoodBracelet: parseFloat(document.getElementById('sandalwoodBracelet-multiplier').value) || defaultFormulas.intimacy.sandalwoodBracelet,
            forage: parseFloat(document.getElementById('forage-intimacy-multiplier').value) || defaultFormulas.intimacy.forage
        }
    };

    saveFormulaSettings(newFormulas);
    closeModal();

    // Пересчитываем с новыми настройками
    calculateCharmTotals();
    calculateIntimacyTotals();
    drawFormulas();
});

// Закрытие модального окна при клике вне его
document.getElementById('settings-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});