// ═══ COUNTDOWN — Live timer & dynamic milestone texts ═══

// Update badge and titles based on months/years together
function updateMilestoneText() {
    const now = new Date();
    let years = now.getFullYear() - ANNIVERSARY_DATE.getFullYear();
    let months = now.getMonth() - ANNIVERSARY_DATE.getMonth();
    let days = now.getDate() - ANNIVERSARY_DATE.getDate();

    if (days < 0) {
        months--;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    let totalMonths = years * 12 + months;
    if (totalMonths <= 0) totalMonths = 1;

    let badgeNum = 1;
    let badgeText = 'MES';
    let titleText = 'Nuestro primer mes juntos';

    if (years >= 1) {
        badgeNum = years;
        badgeText = years === 1 ? 'AÑO' : 'AÑOS';
        titleText = years === 1 ? 'Nuestro primer año juntos' : `Nuestros ${years} años juntos`;
    } else {
        badgeNum = totalMonths;
        badgeText = totalMonths === 1 ? 'MES' : 'MESES';
        titleText = totalMonths === 1 ? 'Nuestro primer mes juntos' : `Nuestros ${totalMonths} meses juntos`;
    }

    const badgeNumberEl = document.querySelector('.badge-number');
    const badgeLabelEl = document.querySelector('.badge-label');
    const entranceTitleEl = document.querySelector('.entrance-title');
    const finalTitleEl = document.querySelector('.final-title');

    if (badgeNumberEl) badgeNumberEl.textContent = badgeNum;
    if (badgeLabelEl) badgeLabelEl.textContent = badgeText;
    if (entranceTitleEl) entranceTitleEl.textContent = titleText;
    if (finalTitleEl) finalTitleEl.textContent = titleText;
}

// Live timer — updates every countdown on the page at once
function startCountdown() {
    updateMilestoneText();
    let renderedDay = new Date().getDate();

    function update() {
        const now = new Date();

        // Roll the milestone over at midnight without needing a reload
        if (now.getDate() !== renderedDay) {
            renderedDay = now.getDate();
            updateMilestoneText();
        }

        const diff = now - ANNIVERSARY_DATE;

        if (diff < 0) {
            document.querySelectorAll('.count-days').forEach(el => el.textContent = '00');
            document.querySelectorAll('.count-hours').forEach(el => el.textContent = '00');
            document.querySelectorAll('.count-minutes').forEach(el => el.textContent = '00');
            document.querySelectorAll('.count-seconds').forEach(el => el.textContent = '00');
            return;
        }

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        document.querySelectorAll('.count-days').forEach(el => el.textContent = String(days).padStart(2, '0'));
        document.querySelectorAll('.count-hours').forEach(el => el.textContent = String(hours % 24).padStart(2, '0'));
        document.querySelectorAll('.count-minutes').forEach(el => el.textContent = String(minutes % 60).padStart(2, '0'));
        document.querySelectorAll('.count-seconds').forEach(el => el.textContent = String(seconds % 60).padStart(2, '0'));
    }

    update();
    setInterval(update, 1000);
}
