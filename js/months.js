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
            if (letter.month === 5) card.classList.add('month-card--muertos');
            card.innerHTML = `
                ${letter.month === 4 ? `<span class="month-card-pumpkin" aria-hidden="true">${CHARM_SVG.pumpkin}</span>` : ''}
                ${letter.month === 4 ? `<span class="month-card-mini-pumpkin" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 8c-2-3 0-5 2-6" fill="none" stroke="#85a84a" stroke-width="2" stroke-linecap="round"/><path d="M16 9C11 5 4 9 4 17c0 7 5 11 12 11s12-4 12-11c0-8-7-12-12-8Z" fill="#f28a24" stroke="#ffbd63" stroke-width="1.3"/><path d="M16 9c-4 3-4 15 0 19m0-19c4 3 4 15 0 19" fill="none" stroke="#bd4b18" stroke-width="1"/><path d="M9 15l3-2 2 3Zm14 0-3-2-2 3ZM10 20q6 6 12 0-1 7-6 5-5 2-6-5Z" fill="#39132c"/></svg></span>` : ''}
                ${letter.month === 5 ? `<span class="month-card-skull" aria-hidden="true">${CHARM_SVG.skull}</span>` : ''}
                ${letter.month === 5 ? `<span class="month-card-mini-skull" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M6 14C6 7 10 4 16 4s10 3 10 10c0 4-2 6-4 7l-1 6H11l-1-6c-2-1-4-3-4-7Z" fill="#fff2dc" stroke="#ff9b35" stroke-width="1.4"/><path d="M10 13l3 2-3 2Zm12 0-3 2 3 2Z" fill="#54204b"/><path d="M16 17l-1.5 2.5h3Z" fill="#d86435"/><path d="M12 23h8m-6-1v3m4-3v3" stroke="#54204b" stroke-width="1"/><path d="M13 8l3-2 3 2-3 2Z" fill="#e96888"/></svg></span>` : ''}
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
