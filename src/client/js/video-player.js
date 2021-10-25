const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volume');
const totalTime = document.getElementById('totalTime');
const currentTime = document.getElementById('currentTime');

let tempVolume = 0.5;
video.volume = tempVolume;

const handleClickPlay = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.textContent = video.paused ? 'Play' : 'Pause';
};
// const handlePlayText = () => {
//     playBtn.textContent = 'Pause';
// };
// const handlePauseText = () => {
//     playBtn.textContent = 'Play';
// };

const handleClickMute = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    volumeRange.value = video.muted ? 0 : tempVolume;
};

const handleChangeVolume = (event) => {
    const {
        target: { value },
    } = event;
    if (Number(value) !== 0) {
        tempVolume = Number(value);
    }
};

const handleInputVolume = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.textContent = 'Mute';
    }
    video.volume = value;
    if (Number(value) === 0) {
        video.muted = true;
        muteBtn.textContent = 'Unmute';
    }
};

const handleTotalTime = () => {
    totalTime.textContent = Math.floor(video.duration);
};

const handleCurrentTime = () => {
    currentTime.textContent = Math.floor(video.currentTime);
};

playBtn.addEventListener('click', handleClickPlay);
// video.addEventListener('play', handlePlayText);
// video.addEventListener('pause', handlePauseText);

muteBtn.addEventListener('click', handleClickMute);
volumeRange.addEventListener('change', handleChangeVolume);
volumeRange.addEventListener('input', handleInputVolume);

// video.addEventListener('loadedmetadata', handleTotalTime);
video.addEventListener('canplay', handleTotalTime);
video.addEventListener('timeupdate', handleCurrentTime);
