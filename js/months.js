// ═══ MONTHS — Monthly cards gallery with time-based unlock ═══

// Full months elapsed since the anniversary (1..12)
function getUnlockedMonths() {
    const now = new Date();
    let months = (now.getFullYear() - ANNIVERSARY_DATE.getFullYear()) * 12
        + (now.getMonth() - ANNIVERSARY_DATE.getMonth());
    if (now.getDate() < ANNIVERSARY_DATE.getDate()) months--;
    return Math.max(UNLOCKED_MONTHS, Math.max(1, Math.min(months, monthlyLetters.length)));
}

// Unlock date label for card N (e.g. "5 de agosto")
function getUnlockDateStr(monthNumber) {
    const d = new Date(ANNIVERSARY_DATE);
    d.setMonth(d.getMonth() + monthNumber);
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${d.getDate()} de ${monthNames[d.getMonth()]}`;
}

// Build the 12-card grid
function buildMonthsGrid() {
    const unlocked = getUnlockedMonths();
    monthsGrid.innerHTML = '';

    monthlyLetters.forEach((letter, index) => {
        const card = document.createElement('div');
        card.classList.add('month-card');
        card.style.animationDelay = `${0.15 + index * 0.07}s`;

        const isUnlocked = letter.month <= unlocked;

        if (isUnlocked) {
            card.classList.add('unlocked');
            if (letter.month === 2) card.classList.add('month-card--spiderman');
            if (letter.month === 3) card.classList.add('month-card--vip');
            if (letter.month === 4) card.classList.add('month-card--halloween');
            card.innerHTML = `
                <span class="month-card-icon icon-envelope">
                    <i class="fa-regular fa-envelope-open"></i>
                    <i class="fa-solid fa-heart icon-heart"></i>
                </span>
                <span class="month-card-number">${letter.month}</span>
                <span class="month-card-label">${letter.month === 12 ? '1 AÑO' : (letter.month === 1 ? 'MES' : 'MESES')}</span>
                <span class="month-card-hint">toca para leer</span>
            `;
            card.addEventListener('click', (e) => {
                heartBurst(e.clientX, e.clientY);
                openMonthLetter(index);
            });
        } else {
            card.classList.add('locked');
            card.innerHTML = `
                <span class="month-card-icon icon-lock">
                    <i class="fa-solid fa-lock"></i>
                </span>
                <span class="month-card-number">${letter.month}</span>
                <span class="month-card-label">${letter.month === 12 ? '1 AÑO' : 'MESES'}</span>
                <span class="month-card-hint">se abre el ${getUnlockDateStr(letter.month)}</span>
            `;
            card.addEventListener('click', () => {
                card.classList.remove('shake');
                void card.offsetWidth; // restart shake animation
                card.classList.add('shake');
            });
        }

        monthsGrid.appendChild(card);
    });

    // Scene-months decorations
    buildNecklace(unlocked);
    buildConstellation(unlocked, 'constellation-container-months');

    // Deferred: fadeInUp is still animating the cards it measures.
    setTimeout(buildCardThread, 1000);
}

// Open an unlocked month's letter
function openMonthLetter(index) {
    const letter = monthlyLetters[index];

    // Dedicated page: navigate away; delay lets the heart burst play.
    if (letter.standaloneUrl) {
        setTimeout(() => {
            window.location.href = letter.standaloneUrl;
        }, 300);
        return;
    }

    // Build up front so a stale tap can't skip ahead
    buildMiniCards(index);
    tapPrompt.style.display = '';
    setTimeout(() => {
        transitionTo(scenes.months, scenes.letter);
    }, 400);
}
