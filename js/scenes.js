// ═══ SCENES — Scene transitions ═══

function transitionTo(from, to) {
    from.classList.remove('active');
    from.classList.add('exit-up');

    setTimeout(() => {
        from.classList.remove('exit-up');
        // Only one scene can ever be active — prevents overlap on fast taps
        Object.values(scenes).forEach(s => s.classList.remove('active'));
        to.classList.add('active');
    }, 600);
}
