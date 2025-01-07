const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const songs = [{
        src: "/docs/assets/audio/track1.mp3",
        name: "Dr. Abraham Sinkov Talks About his Move into the Cryptologic Field",
    },
    {
        src: "/docs/assets/audio/track2.mp3",
        name: "Snippet from News Conference Held in Moscow Regarding Mitchell and Martin Defection",
    },
    {
        src: "/docs/assets/audio/track3.mp3",
        name: "Brigadier General John Tiltman speaks about the TUNNY machine",
    },
    {
        src: "/docs/assets/audio/man-scream-121085.mp3",
        name: "soldier germany",
    },
    {
        src: "/docs/assets/audio/screaming-woman-in-the-basement.mp3",
        name: "Anastasia Ivanova",
    },
    {
        src: "/docs/assets/audio/horror-sound-monster-breath-189934.mp3",
        name: "Zylar - Zone 51",
    },
];


const textButtonPlay = "<i class='bx bx-caret-right'></i>";
const textButtonPause = "<i class='bx bx-pause'></i>";

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted ?
        (player.currentTime / durationFormatted) * 100 :
        0;

    progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {
    if ((type == "next" && index + 1 === songs.length) || type === "init") {
        index = 0;
    } else if (type == "prev" && index === 0) {
        index = songs.length;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
    if (type !== "init") playPause();

    updateTime();
};

prevNextMusic("init");