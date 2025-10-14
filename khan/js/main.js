document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

const drawFormulas = function () {
    const formulas = getFormulaSettings()

    document.getElementById('blueHadak-multiplier_desc').textContent = formulas.charm.blueHadak;
    document.getElementById('silverHairpin-multiplier_desc').textContent = formulas.charm.silverHairpin;
    document.getElementById('chests-multiplier_desc').textContent = formulas.charm.chests;
    document.getElementById('forage-charm-multiplier_desc').textContent = formulas.charm.forage;
    document.getElementById('ordos-multiplier_desc').textContent = formulas.intimacy.ordos;
    document.getElementById('sandalwoodBracelet-multiplier_desc').textContent = formulas.intimacy.sandalwoodBracelet;
    document.getElementById('forage-intimacy-multiplier_desc').textContent = formulas.intimacy.forage;

}


const calculateCharmTotals = function () {

    const formulas = getFormulaSettings();

    const concubines = parseInt(document.getElementById('concubines').value) || 0;
    const whiteHadak = parseInt(document.getElementById('whiteHadak').value) || 0;
    const blueHadak = parseInt(document.getElementById('blueHadak').value) || 0;
    const goldHairpin = parseInt(document.getElementById('goldHairpin').value) || 0;
    const silverHairpin = parseInt(document.getElementById('silverHairpin').value) || 0;
    const chests = parseInt(document.getElementById('chests').value) || 0;
    const spirits = parseInt(document.getElementById('spirits').value) || 0;
    const forage = parseInt(document.querySelector('.forage').value) || 0;

    const blueHadakTotal = Number(Math.floor(blueHadak * concubines * formulas.charm.blueHadak).toFixed(0));
    const whiteHadakTotal = whiteHadak * concubines;
    const goldHairpinTotal = goldHairpin * 5;
    const silverHairpinTotal = Number(Math.floor(silverHairpin * formulas.charm.silverHairpin).toFixed(0));
    const chestsTotal = Number(Math.floor(chests * formulas.charm.chests).toFixed(0));
    const spiritsTotal = spirits;
    const forageTotal = Number(Math.floor(forage * formulas.charm.forage).toFixed(0));

    const total = blueHadakTotal + whiteHadakTotal + goldHairpinTotal + silverHairpinTotal +
        chestsTotal + spiritsTotal + forageTotal;

    document.getElementById('blueHadakTotal').textContent = blueHadakTotal;
    document.getElementById('whiteHadakTotal').textContent = whiteHadakTotal;
    document.getElementById('goldHairpinTotal').textContent = goldHairpinTotal;
    document.getElementById('silverHairpinTotal').textContent = silverHairpinTotal;
    document.getElementById('chestsTotal').textContent = chestsTotal;
    document.getElementById('spiritsTotal').textContent = spiritsTotal;
    document.getElementById('forageTotal').textContent = forageTotal;
    document.getElementById('charm-total').textContent = Math.floor(total).toFixed(0);
}

const calculateIntimacyTotals = function () {

    const formulas = getFormulaSettings();

    const concubines = parseInt(document.getElementById('concubines').value) || 0;
    const ordos = parseInt(document.getElementById('ordos').value) || 0;
    const takya = parseInt(document.getElementById('takya').value) || 0;
    const jadeBracelet = parseInt(document.getElementById('jadeBracelet').value) || 0;
    const sandalwoodBracelet = parseInt(document.getElementById('sandalwoodBracelet').value) || 0;
    const goldEarrings = parseInt(document.getElementById('goldEarrings').value) || 0;
    const gemRing = parseInt(document.getElementById('gemRing').value) || 0;
    const letter = parseInt(document.getElementById('letter').value) || 0;
    const forage = parseInt(document.querySelector('.forage').value) || 0;

    const ordosTotal = Number(Math.floor(ordos * concubines * formulas.intimacy.ordos).toFixed(0));
    const takyaTotal = takya * concubines;
    const jadeBraceletTotal = jadeBracelet * 5;
    const sandalwoodBraceletTotal = Number(Math.floor(sandalwoodBracelet * formulas.intimacy.sandalwoodBracelet).toFixed(0));
    const goldEarringsTotal = goldEarrings * 2;
    const gemRingTotal = gemRing;
    const letterTotal = letter;
    const forageTotal = Number(Math.floor(forage * formulas.intimacy.forage).toFixed(1));

    const total = ordosTotal + takyaTotal + jadeBraceletTotal + sandalwoodBraceletTotal +
        goldEarringsTotal + gemRingTotal + letterTotal + forageTotal;

    document.getElementById('ordos-total').textContent = ordosTotal;
    document.getElementById('takya-total').textContent = takyaTotal;
    document.getElementById('jadeBracelet-total').textContent = jadeBraceletTotal;
    document.getElementById('sandalwoodBracelet-total').textContent = sandalwoodBraceletTotal;
    document.getElementById('goldEarrings-total').textContent = goldEarringsTotal;
    document.getElementById('gemRing-total').textContent = gemRingTotal;
    document.getElementById('letter-total').textContent = letterTotal;
    document.getElementById('intimacy-forage-total').textContent = forageTotal;
    document.getElementById('intimacy-total').textContent = Math.floor(total).toFixed(0);
}


document.querySelectorAll('input.listen').forEach(input => {
    input.addEventListener('input', calculateIntimacyTotals);
    input.addEventListener('input', calculateCharmTotals);
});


const forageInputs = document.querySelectorAll('.forage');
const syncForageValues = (source) => {
    forageInputs.forEach(function (el) {
        el.value = source.value;
        calculateCharmTotals()
        calculateIntimacyTotals()
    });
};

forageInputs.forEach(input => {
    input.addEventListener('input', () => syncForageValues(input));
});

calculateCharmTotals();
calculateIntimacyTotals();
drawFormulas();