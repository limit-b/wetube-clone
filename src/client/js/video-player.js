const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volume');
// const time = document.getElementById('time');

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

const handleVolume = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.textContent = 'Mute';
    }
    tempVolume = Number(value);
    video.volume = value;
    if (tempVolume === 0) {
        video.muted = true;
        muteBtn.textContent = 'Unmute';
    }
};

playBtn.addEventListener('click', handleClickPlay);
// video.addEventListener('play', handlePlayText);
// video.addEventListener('pause', handlePauseText);

muteBtn.addEventListener('click', handleClickMute);
volumeRange.addEventListener('input', handleVolume);
