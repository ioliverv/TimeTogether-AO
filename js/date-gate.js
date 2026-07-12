// ═══ DATE GATE — Auto-format & validate the unlock date ═══

dateInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    if (value.length > 10) value = value.slice(0, 10);

    e.target.value = value;

    dateError.classList.remove('show');
    dateInput.classList.remove('error');

    if (value.length === 10) {
        validateDate(value);
    }
});

dateInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && dateInput.value.length === 10) {
        validateDate(dateInput.value);
    }
});

// Correct date unlocks the gallery; wrong date shakes the input
function validateDate(value) {
    if (value === CORRECT_DATE) {
        dateInput.classList.add('success');
        dateInput.disabled = true;
        dateError.classList.remove('show');

        if (bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().catch(() => { });
        }

        setTimeout(() => {
            buildMonthsGrid();
            transitionTo(scenes.entrance, scenes.months);
        }, 1000);
    } else {
        dateInput.classList.add('error');
        dateError.classList.add('show');

        setTimeout(() => {
            dateInput.classList.remove('error');
        }, 500);
    }
}
