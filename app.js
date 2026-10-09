const menu = document.getElementById("menu");
const game = document.getElementById("game");
const playButton = document.getElementById("play-button");

const cat = document.getElementById("cat");

let speed = 30;
let catPosition = 0;

/* COMEÇAR JOGO */
playButton.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "block";
});

/* MOVIMENTO */
document.addEventListener("keydown", (event) => {

    let gameWidth = game.clientWidth;
    let catWidth = cat.clientWidth; // Pega a largura real da Kiara na tela

    if (event.key === "ArrowLeft") {
        catPosition -= speed;
        cat.src = "img/kiara-left.png";
    }

    if (event.key === "ArrowRight") {
        catPosition += speed;
        cat.src = "img/kiara-right.png";
    }

    /* LIMITES DA TELA SIMPLIFICADOS */
    // Limite da Esquerda é 0 (início da tela)
    if (catPosition < 0) {
        catPosition = 0;
    }

    // Limite da Direita é o tamanho do jogo MENOS o tamanho da gatinha
    if (catPosition > gameWidth - catWidth) {
        catPosition = gameWidth - catWidth;
    }

    // Aplicamos o movimento direto, sem calc(-50%)
    cat.style.transform = `translateX(${catPosition}px)`;
});