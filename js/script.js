// Seleciona os elementos do HTML
const audio = document.getElementById("player");
const musicName = document.getElementById("musicName");
const playPauseButton = document.getElementById("playPauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volumeSlider");

// Lista de músicas
let index = 0;
const songs = [
    {
        src: "./musics/1.mp3",
        name: "Ritmadinha Dançante",
    },
    {
        src: "./musics/2.mp3",
        name: "Tuca Tuca",
    },
    {
        src: "./musics/3.mp3",
        name: "Automotivo Bibi",
    },
    // ... outras músicas
];

// Atualiza o tempo da música e a barra de progresso
audio.addEventListener("timeupdate", () => {
    updateTime();
    updateProgressBar();
});

// Função para atualizar o tempo de reprodução
const updateTime = () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${formatZero(currentSeconds)}`;

    const durationFormatted = isNaN(audio.duration) ? 0 : audio.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = `${durationMinutes}:${formatZero(durationSeconds)}`;
};

// Função para formatar números menores que 10 com zero à esquerda
const formatZero = (n) => (n < 10 ? `0${n}` : n);

// Função para atualizar a barra de progresso
const updateProgressBar = () => {
    const progressWidth = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressWidth}%`;
};

// Evento de clique na barra de progresso para definir a posição da música
const progressBar = document.querySelector(".progress-bar");

progressBar.addEventListener("click", (event) => {
    const progressBarWidth = progressBar.offsetWidth;
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = newTime;
});


// Função para reproduzir ou pausar a música
const playPause = () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "<i class='bx bx-pause'></i>";
    } else {
        audio.pause();
        playPauseButton.innerHTML = "<i class='bx bx-caret-right'></i>";
    }
};

playPauseButton.addEventListener("click", playPause);

// Função para carregar e reproduzir uma música
const loadAndPlaySong = (songIndex) => {
    index = (songIndex + songs.length) % songs.length;
    const song = songs[index];
    audio.src = song.src;
    musicName.textContent = song.name;
    audio.play();
    playPauseButton.innerHTML = "<i class='bx bx-pause'></i>";
};

prevButton.addEventListener("click", () => loadAndPlaySong(index - 1));
nextButton.addEventListener("click", () => loadAndPlaySong((index + 1) % songs.length));

// Função para embaralhar a lista de músicas
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Evento de carregamento da página
window.addEventListener("load", () => {
    shuffleArray(songs);
    loadAndPlaySong(0);
    
    // Define o valor inicial do controle de volume
    volumeSlider.value = 10;
    
    // Configura o volume inicial com base no controle de volume
    audio.volume = volumeSlider.value / 100;
    
    // Evento de alteração no controle de volume
    volumeSlider.addEventListener("input", () => {
        const volume = volumeSlider.value / 100;
        audio.volume = volume;
    });
});

// Efeito de movimento do Gengar
const gengar = document.getElementById("Gengar");

function moveGengar() {
    const translateX = Math.random() * 100 - 5;
    const translateY = Math.random() * 10 - 5;
    
    gengar.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

setInterval(moveGengar, 1000); // Move o Gengar a cada segundo

// Alteração de cor de fundo
const colors = ['#FF1493', '#00FF00', '#0000FF', '#FFFF00', '#FF4500'];
let currentIndex = 0;

function changeBackgroundColor() {
    const newColor = colors[currentIndex];
    document.body.style.backgroundColor = newColor;

    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeBackgroundColor, 1000); // Altera a cor de fundo a cada segundo

// Controle de volume
volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value / 100;
    audio.volume = volume;
});

