const menu = document.getElementById("menu");
const game = document.getElementById("game");
const playButton = document.getElementById("play-button");
const cat = document.getElementById("cat");
const scoreDisplay = document.getElementById("score");
const livesContainer = document.getElementById("lives-container"); // Pega o container de vidas

let speed = 30;
let catPosition = 0;
let points = 0;
let lives = 7; // Configura as 7 vidas iniciais da Kiara!

/* COMEÇAR JOGO */
playButton.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";

    // Inicia a chuva de corações
    setInterval(createHeart, 1500);
});

/* FUNÇÃO DE MOVIMENTAR A KIARA */
function moveCat(direction) {
    let gameWidth = game.clientWidth;
    let catWidth = cat.clientWidth;

    if (direction === "left") {
        catPosition -= speed;
        cat.src = "img/kiara-left.png";
    }

    if (direction === "right") {
        catPosition += speed;
        cat.src = "img/kiara-right.png";
    }

    /* LIMITES DA TELA */
    if (catPosition < 0) {
        catPosition = 0;
    }

    if (catPosition > gameWidth - catWidth) {
        catPosition = gameWidth - catWidth;
    }

    cat.style.transform = `translateX(${catPosition}px)`;
}

/* CONTROLE POR TECLADO (PC) */
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        moveCat("left");
    }
    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        moveCat("right");
    }
});

/* CONTROLE POR TOQUE (CELULAR) */
game.addEventListener("touchstart", (event) => {
    let gameWidth = game.clientWidth;
    let touchX = event.touches[0].clientX;

    if (touchX < gameWidth / 2) {
        moveCat("left");
    } else {
        moveCat("right");
    }
});

/* --- MECÂNICA DOS CORAÇÕES --- */
function createHeart() {
    const heart = document.createElement("img");
    heart.src = "img/black-hear.png";
    heart.classList.add("heart");

    const gameWidth = game.clientWidth;
    const randomX = Math.floor(Math.random() * (gameWidth - 48));
    heart.style.left = `${randomX}px`;
    heart.style.top = "-48px";

    game.appendChild(heart);

    let heartTop = -48;
    const fallSpeed = 4;

    const fallInterval = setInterval(() => {
        heartTop += fallSpeed;
        heart.style.top = `${heartTop}px`;

        // Sistema de colisão
        const catRect = cat.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (
            heartRect.right > catRect.left &&
            heartRect.left < catRect.right &&
            heartRect.bottom > catRect.top &&
            heartRect.top < catRect.bottom
        ) {
            points += 1;
            scoreDisplay.innerHTML = `🖤 ${points}`;
            
            // Adiciona o pulinho da Kiara
            cat.classList.add("jump-animation");
            setTimeout(() => {
                cat.classList.remove("jump-animation");
            }, 300);

            clearInterval(fallInterval);
            heart.remove();
        }

        // Verifica se errou o coração
        const gameHeight = game.clientHeight;
        if (heartTop > gameHeight - 40) {
            clearInterval(fallInterval);
            heart.remove();
        }
    }, 20);
}