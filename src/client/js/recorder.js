const previewVideo = document.getElementById('preview-video');
const recordBtn = document.getElementById('record-btn');

let videoUrl = null;
let desktopStream = null;
let recorder = null;

const handleDownload = () => {
    const videoAnchor = document.createElement('a');
    videoAnchor.href = videoUrl;
    videoAnchor.download = 'MyRecording.mp4';
    document.body.appendChild(videoAnchor);
    videoAnchor.click();
    desktopStream.getTracks().forEach((track) => track.stop());
    desktopStream = null;
    document.body.removeChild(videoAnchor);
};

const handleStopRecording = () => {
    recordBtn.textContent = 'Download Recording';
    recordBtn.removeEventListener('click', handleStopRecording);
    recordBtn.addEventListener('click', handleDownload);
    recorder.stop();
};

const handleStartRecording = () => {
    recordBtn.textContent = 'Stop Recording';
    recordBtn.removeEventListener('click', handleStartRecording);
    recordBtn.addEventListener('click', handleStopRecording);
    recorder = new MediaRecorder(desktopStream, { mimeType: 'video/mp4' });
    recorder.ondataavailable = (event) => {
        videoUrl = URL.createObjectURL(event.data);
        previewVideo.srcObject = null;
        previewVideo.src = videoUrl;
        previewVideo.loop = true;
        previewVideo.play();
    };
    recorder.start();
};

const handleReadyRecording = async () => {
    try {
        // const stream = await navigator.mediaDevices.getUserMedia({
        //     audio: false,
        //     video: true,
        // });
        desktopStream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: { width: 1024, height: 576 },
        });
        previewVideo.srcObject = desktopStream;
    } catch (error) {
        console.error('stream error :', error);
    }
    previewVideo.play();
    recordBtn.textContent = 'Start Recording';
    recordBtn.removeEventListener('click', handleReadyRecording);
    recordBtn.addEventListener('click', handleStartRecording);
};

recordBtn.addEventListener('click', handleReadyRecording);
