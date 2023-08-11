const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-bar-container"); // Elemento que envolve a barra de progresso

const textButtonPlay = "<i class='bx bx-caret-right'></i>";
const textButtonPause = "<i class='bx bx-pause'></i>";

const colors = ['#FF1493', '#00FF00', '#0000FF', '#FFFF00', '#FF4500'];
let currentIndex = 0;

function changeColor() {
  document.body.style.backgroundColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 1000); // Altera a cor a cada segundo
let index = 0;
let songs = [
    {
        src: "./musics/1.mp3",
        name: "Ritmadinha Dançante",
    },
    {
        src: "./musics/2.mp3",
        name: "Tuca Tuca",
    },

  
    // ... outras músicas
];

// Função para carregar e tocar uma música aleatória
const loadAndPlayRandomSong = () => {
    shuffleArray(songs);
    loadAndPlaySong(0); // Carrega e toca a primeira música do array embaralhado
};
const audio = new Audio();

const playPause = () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        audio.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

const updateTime = () => {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(audio.duration) ? 0 : audio.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted
        ? (audio.currentTime / durationFormatted) * 100
        : 0;

    progress.style.width = progressWidth + "%";
};

playPauseButton.addEventListener("click", playPause);
audio.addEventListener("timeupdate", () => {
    updateTime();
    updateProgressBar();
});

const loadAndPlaySong = (songIndex) => {
    if (songIndex >= 0 && songIndex < songs.length) {
        index = songIndex;
        audio.src = songs[index].src;
        musicName.innerHTML = songs[index].name;
        playPause();
    }
};

prevButton.addEventListener("click", () => loadAndPlaySong(index - 1));
nextButton.addEventListener("click", () => loadAndPlaySong(index + 1));

const formatZero = (n) => (n < 10 ? "0" + n : n);
loadAndPlaySong(0);

const volumeSlider = document.querySelector("#volumeSlider");

const updateVolume = () => {
    const volume = volumeSlider.value / 100;
    audio.volume = volume;
};
volumeSlider.addEventListener("input", updateVolume);
volumeSlider.value = audio.volume * 100;
volumeSlider.value = 50;
const updateProgressBar = () => {
    const progressWidth = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressWidth + "%";
};

progressBarContainer.addEventListener("click", (event) => {
    const progressBarWidth = progressBarContainer.offsetWidth;
    const clickPosition = event.clientX - progressBarContainer.getBoundingClientRect().left;
    const newTime = (clickPosition / progressBarWidth) * audio.duration;

    audio.currentTime = newTime;
});
audio.addEventListener("ended", () => {
    loadAndPlaySong(index + 1); // Carrega e toca a próxima música
});

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};





// Chame a função para carregar e tocar uma música aleatória ao carregar a página
window.addEventListener("load", loadAndPlayRandomSong);
