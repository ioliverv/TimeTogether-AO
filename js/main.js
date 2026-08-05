// ═══ MAIN — Final scene buttons & init (loads last) ═══

restartBtn.addEventListener('click', (e) => {
    heartBurst(e.clientX, e.clientY);
    setTimeout(() => window.location.reload(), 800);
});

backToCardsBtn.addEventListener('click', (e) => {
    heartBurst(e.clientX, e.clientY);
    setTimeout(() => {
        buildMonthsGrid();
        transitionTo(scenes.final, scenes.months);
    }, 500);
});

// ─── Init ───
generateParticles();
generateHearts();
startFireworks();
startCountdown();

// Entrance decorations
const _unlockedNow = getUnlockedMonths();
buildGarden(_unlockedNow);
buildConstellation(_unlockedNow);
buildNecklace(_unlockedNow, 'necklace-container-entrance');
