const videoContainer = document.getElementById('video-container');
const video = document.querySelector('video');
const videoControls = document.getElementById('video-controls');
const timeline = document.getElementById('timeline');
const playBtn = document.getElementById('play');
const playIcon = playBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const muteIcon = muteBtn.querySelector('i');
const volumeRange = document.getElementById('volume');
const totalTime = document.getElementById('totalTime');
const currentTime = document.getElementById('currentTime');
const fullScreenBtn = document.getElementById('full-screen');
const fullScreenIcon = fullScreenBtn.querySelector('i');

let moveTimeoutID = null;
let leaveTimeoutID = null;
let tempVolume = 0.5;
video.volume = tempVolume;

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

const handleVideoData = () => {
    totalTime.textContent = setFormatTime(video.duration);
    timeline.max = Math.floor(video.duration);
};

const handleCurrentTime = () => {
    currentTime.textContent = setFormatTime(video.currentTime);
    timeline.value = Math.floor(video.currentTime);
};

const handleTimeline = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const hideVideoControls = () => videoControls.classList.remove('showing');

const handleMouseMove = () => {
    if (moveTimeoutID) {
        clearTimeout(moveTimeoutID);
        moveTimeoutID = null;
    }
    if (leaveTimeoutID) {
        clearTimeout(leaveTimeoutID);
        leaveTimeoutID = null;
    }
    videoControls.classList.add('showing');
    moveTimeoutID = setTimeout(hideVideoControls, 3000);
};

const handleMouseLeave = () => {
    leaveTimeoutID = setTimeout(hideVideoControls, 3000);
};

const handleClickPlay = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
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
    video.volume = video.muted ? 0 : tempVolume;
    muteIcon.classList = video.muted
        ? 'fas fa-volume-mute'
        : 'fas fa-volume-up';
    volumeRange.value = video.muted ? 0 : tempVolume;
};

const handleChangeVolume = (event) => {
    const {
        target: { value },
    } = event;
    const changeVolume = Number(value);
    if (changeVolume !== 0) {
        tempVolume = changeVolume;
    }
};

const handleInputVolume = (event) => {
    const {
        target: { value },
    } = event;
    const inputVolume = Number(value);
    video.volume = inputVolume;
    if (inputVolume === 0) {
        video.muted = true;
    } else {
        video.muted = false;
    }
    muteIcon.classList = video.muted
        ? 'fas fa-volume-mute'
        : 'fas fa-volume-up';
};

const handleFullScreen = () => {
    const { fullscreenElement } = document;
    if (fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
    fullScreenIcon.classList = fullscreenElement
        ? 'fas fa-expand'
        : 'fas fa-compress';
};

video.addEventListener('canplay', handleVideoData);
video.addEventListener('timeupdate', handleCurrentTime);
timeline.addEventListener('input', handleTimeline);

videoContainer.addEventListener('mousemove', handleMouseMove);
videoContainer.addEventListener('mouseleave', handleMouseLeave);

playBtn.addEventListener('click', handleClickPlay);
// video.addEventListener('play', handlePlayText);
// video.addEventListener('pause', handlePauseText);

muteBtn.addEventListener('click', handleClickMute);
volumeRange.addEventListener('change', handleChangeVolume);
volumeRange.addEventListener('input', handleInputVolume);

fullScreenBtn.addEventListener('click', handleFullScreen);
