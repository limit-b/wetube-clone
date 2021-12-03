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

const videoDuration = Math.floor(video.duration);
const timeupdateDuration = Math.floor(videoDuration * 3.5);

let moveTimeoutID = null;
let leaveTimeoutID = null;
let tempVolume = 0.5;
let timeupdateCount = 0;

video.volume = tempVolume;

const setFormatTime = (time) => {
    let fromNumber;
    let lengthNumber;
    if (time < 600) {
        fromNumber = 15;
        lengthNumber = 4;
    } else if (time >= 600 && time < 3600) {
        fromNumber = 14;
        lengthNumber = 5;
    } else if (time >= 3600) {
        fromNumber = 12;
        lengthNumber = 7;
    }
    const formatTime = new Date(time * 1000)
        .toISOString()
        .substr(fromNumber, lengthNumber);
    return formatTime;
};

const handleVideoData = () => {
    totalTime.textContent = setFormatTime(videoDuration);
    timeline.max = videoDuration;
};

const handleCurrentTime = () => {
    const videoCurrentTime = Math.floor(video.currentTime);
    currentTime.textContent = setFormatTime(videoCurrentTime);
    timeline.value = videoCurrentTime;
};

const handleTimeline = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const showVideoControls = () => videoControls.classList.remove('hide');
const hideVideoControls = () => videoControls.classList.add('hide');

const handleMouseMove = () => {
    if (moveTimeoutID) {
        clearTimeout(moveTimeoutID);
        moveTimeoutID = null;
    }
    if (leaveTimeoutID) {
        clearTimeout(leaveTimeoutID);
        leaveTimeoutID = null;
    }
    showVideoControls();
    if (!video.paused) {
        moveTimeoutID = setTimeout(hideVideoControls, 3000);
    }
};

const handleMouseLeave = () => {
    if (!video.paused) {
        leaveTimeoutID = setTimeout(hideVideoControls, 3000);
    }
};

const handleClickPlay = () => {
    if (video.paused) {
        video.play();
        moveTimeoutID = setTimeout(hideVideoControls, 3000);
    } else {
        video.pause();
        showVideoControls();
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

const handleRegisterView = () => {
    timeupdateCount += 1;
    const { videoId } = videoContainer.dataset;
    if (videoDuration <= 30 && timeupdateCount >= timeupdateDuration) {
        fetch(`/api/videos/${videoId}/view`, { method: 'post' });
        video.removeEventListener('timeupdate', handleRegisterView);
    } else if (timeupdateCount === 100) {
        fetch(`/api/videos/${videoId}/view`, { method: 'post' });
        video.removeEventListener('timeupdate', handleRegisterView);
    }
    // else if (timeupdateCount === 110) {
    // }
};

const handleEnded = () => {
    showVideoControls();
};

if (video.readyState) {
    handleVideoData();
}

video.addEventListener('loadedmetadata', handleVideoData);
// video.addEventListener('canplay', handleVideoData);

video.addEventListener('timeupdate', handleCurrentTime);
timeline.addEventListener('input', handleTimeline);

videoContainer.addEventListener('mousemove', handleMouseMove);
videoContainer.addEventListener('mouseleave', handleMouseLeave);

video.addEventListener('click', handleClickPlay);
playBtn.addEventListener('click', handleClickPlay);
// video.addEventListener('play', handlePlayText);
// video.addEventListener('pause', handlePauseText);

muteBtn.addEventListener('click', handleClickMute);
volumeRange.addEventListener('change', handleChangeVolume);
volumeRange.addEventListener('input', handleInputVolume);

fullScreenBtn.addEventListener('click', handleFullScreen);

video.addEventListener('timeupdate', handleRegisterView);
video.addEventListener('ended', handleEnded);
