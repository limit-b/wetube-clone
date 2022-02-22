const videoContainer = document.getElementById('video-container');
const video = videoContainer.querySelector('video');
const videoControls = document.getElementById('video-controls');
const timeline = document.getElementById('timeline');
const playBtn = document.getElementById('play');
const playIcon = playBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volume');
const totalTime = document.getElementById('totalTime');
const currentTime = document.getElementById('currentTime');
const fullScreenBtn = document.getElementById('full-screen');

const endNumber = 19;

let hideTimeoutID = null;
let tempVolume = 0.5;
let timeupdateCount = 0;

video.volume = tempVolume;

const preventScroll = (event) => {
    if (event.key === ' ' && event.target === document.body) {
        event.preventDefault();
    }
};

const setFormatTime = (time) => {
    let startNumber;
    if (time < 600) {
        startNumber = 15;
    } else if (time >= 600 && time < 3600) {
        startNumber = 14;
    } else if (time >= 3600) {
        startNumber = 12;
    }
    const formatTime = new Date(time * 1000)
        .toISOString()
        .substring(startNumber, endNumber);
    return formatTime;
};

const handleVideoData = () => {
    const videoDuration = Math.floor(video.duration);
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

const handleVideoControls = () => {
    if (hideTimeoutID) {
        clearTimeout(hideTimeoutID);
        hideTimeoutID = null;
    }
    showVideoControls();
    if (!video.paused) {
        hideTimeoutID = setTimeout(hideVideoControls, 3000);
    }
};

const handlePlay = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    handleVideoControls();
    playIcon.classList = video.paused ? 'fas fa-play' : 'fas fa-pause';
};

// const handlePlayText = () => {
//     playBtn.textContent = 'Pause';
// };
//
// const handlePauseText = () => {
//     playBtn.textContent = 'Play';
// };

const changeMuteIcon = () => {
    const muteIcon = muteBtn.querySelector('i');
    muteIcon.classList = video.muted
        ? 'fas fa-volume-mute'
        : 'fas fa-volume-up';
};

const handleMute = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    handleVideoControls();
    video.volume = video.muted ? 0 : tempVolume;
    changeMuteIcon();
    // muteIcon.classList = video.muted
    //     ? 'fas fa-volume-mute'
    //     : 'fas fa-volume-up';
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
    changeMuteIcon();
    // muteIcon.classList = video.muted
    //     ? 'fas fa-volume-mute'
    //     : 'fas fa-volume-up';
};

const handleFullScreen = () => {
    const fullScreenIcon = fullScreenBtn.querySelector('i');
    const { fullscreenElement } = document;
    if (fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
    handleVideoControls();
    fullScreenIcon.classList = fullscreenElement
        ? 'fas fa-expand'
        : 'fas fa-compress';
};

const handleShortcutKey = (event) => {
    const { activeElement } = document;
    const { selectionStart, isContentEditable } = activeElement;
    const { key } = event;
    if ((activeElement && selectionStart !== undefined) || isContentEditable) {
        return;
    }
    switch (key) {
        case ' ':
            handlePlay();
            break;
        case 'm' || 'M':
            handleMute();
            break;
        case 'f' || 'F':
            handleFullScreen();
            break;
        default:
            break;
    }
};

const handleRegisterView = () => {
    const videoDuration = Math.floor(video.duration);
    const timeupdateDuration = Math.floor(videoDuration * 3.5);
    timeupdateCount += 1;
    if (
        (videoDuration <= 30 && timeupdateCount >= timeupdateDuration) ||
        timeupdateCount === 100
    ) {
        const { videoId } = videoContainer.dataset;
        fetch(`/api/videos/${videoId}/view`, { method: 'post' });
        video.removeEventListener('timeupdate', handleRegisterView);
    }
    // else if (timeupdateCount === 100) {
    //     fetchRegisterView();
    //     video.removeEventListener('timeupdate', handleRegisterView);
    // }
};

const handleEnded = () => {
    showVideoControls();
};

if (video.readyState) {
    handleVideoData();
}
// else {
//     setTimeout(() => window.location.reload(), 500);
// }

window.addEventListener('keydown', preventScroll);

video.addEventListener('loadedmetadata', handleVideoData);

video.addEventListener('timeupdate', handleCurrentTime);
timeline.addEventListener('input', handleTimeline);

videoContainer.addEventListener('mousemove', handleVideoControls);
// videoContainer.addEventListener('mouseleave', handleVideoControls);

video.addEventListener('click', handlePlay);
playBtn.addEventListener('click', handlePlay);
// video.addEventListener('play', handlePlayText);
// video.addEventListener('pause', handlePauseText);

muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('change', handleChangeVolume);
volumeRange.addEventListener('input', handleInputVolume);

fullScreenBtn.addEventListener('click', handleFullScreen);

document.addEventListener('keydown', handleShortcutKey);

video.addEventListener('timeupdate', handleRegisterView);
video.addEventListener('ended', handleEnded);
