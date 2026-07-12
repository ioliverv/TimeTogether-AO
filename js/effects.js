// ═══ EFFECTS — Particles, hearts, bursts, fireworks ═══

// Floating ambient particles
function generateParticles() {
    const container = document.getElementById('particles-container');
    const count = 40;
    const types = ['particle-gold', 'particle-white', 'particle-red'];

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.classList.add(types[Math.floor(Math.random() * types.length)]);

        const size = Math.random() * 3 + 1.5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.animationDuration = `${Math.random() * 8 + 8}s`;
        p.style.animationDelay = `-${Math.random() * 12}s`;
        p.style.setProperty('--drift', `${(Math.random() - 0.5) * 30}vw`);

        container.appendChild(p);
    }
}

// Floating background hearts
function generateHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['🤍', '♡', '❤️', '🤎'];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const h = document.createElement('div');
        h.classList.add('floating-heart');
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = `${Math.random() * 100}vw`;
        h.style.fontSize = `${Math.random() * 10 + 10}px`;
        h.style.animationDuration = `${Math.random() * 10 + 12}s`;
        h.style.animationDelay = `-${Math.random() * 15}s`;
        h.style.setProperty('--heart-rot', `${Math.random() * 360}deg`);

        container.appendChild(h);
    }
}

// Heart burst on click
function heartBurst(x, y) {
    const hearts = ['❤️', '🤍', '🤎', '♡', '💕'];
    for (let i = 0; i < 8; i++) {
        const h = document.createElement('div');
        h.classList.add('heart-burst');
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = `${x}px`;
        h.style.top = `${y}px`;
        h.style.setProperty('--bx', `${(Math.random() - 0.5) * 200}px`);
        h.style.setProperty('--by', `${(Math.random() - 0.5) * 200}px`);
        h.style.setProperty('--br', `${Math.random() * 360}deg`);
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }
}

// Fireworks (entrance scene only)
function startFireworks() {
    const container = scenes.entrance;
    const palettes = [
        ['#f5d99b', '#c9a96e', '#fff3d6'],
        ['#ffffff', '#ffe9ec', '#f7cad0'],
        ['#e8b4b8', '#f7cad0', '#fff0f3'],
        ['#d16d6d', '#e89a9a', '#f5d99b'],
        ['#c9a96e', '#ffffff', '#e8b4b8']
    ];

    function launchFirework() {
        const fw = document.createElement('div');
        fw.classList.add('firework-center');
        fw.style.left = `${Math.random() * 80 + 10}vw`;
        fw.style.top = `${Math.random() * 45 + 8}vh`;

        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        const isWillow = Math.random() < 0.3;
        const sparkCount = isWillow ? 42 : Math.floor(Math.random() * 15) + 28;
        const baseRadius = isWillow ? 90 : Math.random() * 70 + 60;

        const flash = document.createElement('div');
        flash.classList.add('firework-flash');
        flash.style.backgroundColor = palette[0];
        fw.appendChild(flash);

        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            if (isWillow) spark.classList.add('spark-willow');

            const color = palette[Math.floor(Math.random() * palette.length)];
            spark.style.backgroundColor = color;
            spark.style.boxShadow = `0 0 6px 1px ${color}`;

            const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
            const radius = baseRadius * (0.7 + Math.random() * 0.5);
            const size = Math.random() * 2.5 + 2.5;

            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            spark.style.setProperty('--tx', `${Math.cos(angle) * radius}px`);
            spark.style.setProperty('--ty', `${Math.sin(angle) * radius}px`);
            spark.style.setProperty('--fall', `${Math.random() * 50 + (isWillow ? 70 : 25)}px`);
            spark.style.animationDuration = `${(isWillow ? 2.4 : 1.8) + Math.random() * 0.6}s`;
            spark.style.animationDelay = `${Math.random() * 0.12}s`;

            fw.appendChild(spark);
        }

        container.appendChild(fw);
        setTimeout(() => fw.remove(), 3400);
    }

    const fireworksInterval = setInterval(() => {
        if (!container.classList.contains('active')) {
            clearInterval(fireworksInterval);
            return;
        }

        launchFirework();
        if (Math.random() < 0.45) {
            setTimeout(launchFirework, Math.random() * 350 + 150);
        }
    }, 650);
}
