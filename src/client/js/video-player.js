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

// const setVideoTime = (time) => {
//     const videoSecond = Math.floor(time);
//     const videoMin = Math.floor(videoSecond / 60);
//     const videoRest = videoSecond % 60;
//     const videoTime = `${videoMin}:${
//         videoRest < 10 ? `0${videoRest}` : `${videoRest}`
//     }`;
//     return videoTime;
// };

const setFormatTime = (time) => {
    const seconds = Math.floor(time);
    let fromNumber;
    let lengthNumber;
    if (seconds < 600) {
        fromNumber = 15;
        lengthNumber = 4;
    } else if (seconds >= 600 && seconds < 3600) {
        fromNumber = 14;
        lengthNumber = 5;
    } else if (seconds >= 3600) {
        fromNumber = 12;
        lengthNumber = 7;
    }
    const formatTime = new Date(seconds * 1000)
        .toISOString()
        .substr(fromNumber, lengthNumber);
    return formatTime;
};

const handleTotalTime = () => {
    // totalTime.textContent = setVideoTime(video.duration);
    totalTime.textContent = setFormatTime(video.duration);
};

const handleCurrentTime = () => {
    // currentTime.textContent = setVideoTime(video.currentTime);
    currentTime.textContent = setFormatTime(video.currentTime);
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
