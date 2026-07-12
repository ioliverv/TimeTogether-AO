// ═══ LETTER — Mini cards, tap to continue ═══

let currentCardIndex = 0;
let miniCardsBuilt = false;
let isTransitioning = false;
let allCards = [];

// Keep the container as tall as the card it's actually showing, so the
// tap-prompt/countdown below it never overlaps a taller-than-usual card
// (mini cards are position:absolute and don't otherwise grow their parent).
function syncCardsContainerHeight(cardEl) {
    if (!cardEl) return;
    miniCardsContainer.style.height = `${cardEl.offsetHeight}px`;
}

// Build mini cards for a month (index into monthlyLetters)
function buildMiniCards(monthIndex = 0) {
    const letter = monthlyLetters[monthIndex];
    allCards = [];
    
    if (letter.greeting) {
        allCards.push({ text: letter.greeting, isGreeting: true });
    }

    allCards.push(
        ...letter.paragraphs.map(text => ({ text, isClosing: false })),
        {
            text: 'Con todo mi cariño,<span class="letter-signature-name">Oliver</span><span class="letter-signature-sub">Para siempre tuyo 🤍</span>',
            isClosing: true
        }
    );

    if (letter.month === 1) {
        allCards.push({
            text: `
                <div class="plankton-card" style="position: relative;">
                    <img src="assets/spongebob_burger.png" alt="SpongeBob" class="plankton-img">
                    <div class="plankton-text-container">
                        <div class="plankton-title">LA FÓRMULA SECRETA DE MI FELICIDAD</div>
                    </div>
                    <div class="bottle-interaction-wrapper">
                        <div class="bottle-ribbon">eres tú</div>
                        <div class="draggable-bottle-container" id="draggable-bottle">
                            <div class="css-bottle-vertical">
                                <div class="css-cork-v"></div>
                                <div class="css-neck-v"></div>
                                <div class="css-body-v">
                                    <div class="css-reflection-v"></div>
                                </div>
                            </div>
                        </div>
                        <div class="pull-hint">^ ¿QUIERES SABER LA FÓRMULA SECRETA?</div>
                    </div>
                </div>
            `,
            isClosing: false
        });
    }

    miniCardsContainer.innerHTML = '';
    currentCardIndex = 0;
    isTransitioning = false;

    allCards.forEach((card, index) => {
        const div = document.createElement('div');
        div.classList.add('mini-card');
        if (card.isClosing) div.classList.add('card-closing');
        if (card.isGreeting) div.classList.add('card-greeting');
        if (card.text.includes('plankton-card')) div.classList.add('card-plankton');

        div.innerHTML = `
            <div class="watermark-card-container">
                <div class="watermark watermark-initials watermark-card">A & O</div>
            </div>
            <div class="mini-card-ornament">❦ ━━ ♡ ━━ ❦</div>
            <div class="mini-card-text">${card.text}</div>
            <div class="mini-card-counter">${index + 1} / ${allCards.length}</div>
        `;

        miniCardsContainer.appendChild(div);
    });

    const initialCards = miniCardsContainer.querySelectorAll('.mini-card');
    syncCardsContainerHeight(initialCards[0]);

    setTimeout(() => {
        if (initialCards[0]) initialCards[0].classList.add('active');
    }, 300);

    miniCardsBuilt = true;
}

// Advance to next card; after the last one, go to the final scene
function advanceCard() {
    if (isTransitioning) return;
    isTransitioning = true;

    const cards = miniCardsContainer.querySelectorAll('.mini-card');

    if (currentCardIndex < allCards.length - 1) {
        const outgoing = cards[currentCardIndex];
        outgoing.classList.remove('active');
        outgoing.classList.add('exit');

        currentCardIndex++;
        const incoming = cards[currentCardIndex];

        // Cover both cards' heights while they crossfade so neither one
        // overlaps the tap-prompt/countdown below the container.
        miniCardsContainer.style.height =
            `${Math.max(outgoing.offsetHeight, incoming.offsetHeight)}px`;

        setTimeout(() => {
            incoming.classList.add('active');
            syncCardsContainerHeight(incoming);
            isTransitioning = false;
        }, 400);
    } else {
        tapPrompt.style.display = 'none';
        setTimeout(() => {
            transitionTo(scenes.letter, scenes.final);
            isTransitioning = false;
        }, 800);
    }
}

// Re-measure on rotation/resize (e.g. mobile keyboard closing) so the
// container keeps matching the currently visible card's real height.
window.addEventListener('resize', () => {
    if (!miniCardsBuilt || isTransitioning) return;
    const cards = miniCardsContainer.querySelectorAll('.mini-card');
    syncCardsContainerHeight(cards[currentCardIndex]);
});

const tapButton = document.getElementById('tap-prompt');
if (tapButton) {
    tapButton.addEventListener('click', (e) => {
        if (!miniCardsBuilt) return;
        heartBurst(e.clientX, e.clientY);
        advanceCard();
    });
}

// ═══ BOTTLE TAP INTERACTION ═══
const cardsContainer = document.getElementById('mini-cards-container');
if (cardsContainer) {
    const handleBottleTap = (e) => {
        const bottleContainer = e.target.closest('#draggable-bottle');
        if (!bottleContainer) return;

        e.stopPropagation();
        
        const wrapper = bottleContainer.closest('.bottle-interaction-wrapper');
        if (wrapper) {
            wrapper.classList.toggle('is-open');
        }
    };

    cardsContainer.addEventListener('click', handleBottleTap);
}
