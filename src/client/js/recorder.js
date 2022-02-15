import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const previewVideo = document.getElementById('preview-video');
const recordBtn = document.getElementById('record-btn');

let videoUrl = null;
let mp4Url = null;
let thumbUrl = null;
let recorder = null;
let desktopStream = null;

URL.revokeObjectURL(videoUrl);
URL.revokeObjectURL(mp4Url);
URL.revokeObjectURL(thumbUrl);

const handleTransVideo = async () => {
    const ffmpeg = createFFmpeg({
        corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
        // corePath: '/static/ffmpeg-core.js',
        log: true,
    });
    await ffmpeg.load();
    ffmpeg.FS('writeFile', 'recording.webm', await fetchFile(videoUrl));
    await ffmpeg.run('-i', 'recording.webm', '-r', '60', 'output.mp4');
    await ffmpeg.run(
        '-i',
        'recording.webm',
        '-ss',
        '00:00:01',
        '-frames:v',
        '1',
        'thumbnail.jpg'
    );
    const mp4File = ffmpeg.FS('readFile', 'output.mp4');
    const thumbFile = ffmpeg.FS('readFile', 'thumbnail.jpg');
    const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
    const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' });
    mp4Url = URL.createObjectURL(mp4Blob);
    thumbUrl = URL.createObjectURL(thumbBlob);
    ffmpeg.FS('unlink', 'recording.webm');
    ffmpeg.FS('unlink', 'output.mp4');
    ffmpeg.FS('unlink', 'thumbnail.jpg');
    // URL.revokeObjectURL(videoUrl);
    // URL.revokeObjectURL(mp4Url);
    // URL.revokeObjectURL(thumbUrl);
};

const handleDownload = () => {
    if (mp4Url === null && thumbUrl === null) {
        handleTransVideo();
    }
    const videoAnchor = document.createElement('a');
    videoAnchor.href = mp4Url;
    videoAnchor.download = 'MyRecording.mp4';
    document.body.appendChild(videoAnchor);
    videoAnchor.click();

    const thumbAnchor = document.createElement('a');
    thumbAnchor.href = thumbUrl;
    thumbAnchor.download = 'MyThumbnail.jpg';
    document.body.appendChild(thumbAnchor);
    thumbAnchor.click();

    // desktopStream.getTracks().forEach((track) => track.stop());
    // desktopStream = null;
    document.body.removeChild(videoAnchor);
    document.body.removeChild(thumbAnchor);
};

const handleStopRecording = () => {
    recordBtn.textContent = 'Download Recording';
    recordBtn.removeEventListener('click', handleStopRecording);
    recordBtn.addEventListener('click', handleDownload);
    recorder.stop();
    desktopStream.getTracks().forEach((track) => track.stop());
    desktopStream = null;
};

const handleStartRecording = () => {
    recordBtn.textContent = 'Recording...';
    recordBtn.disabled = true;
    recordBtn.removeEventListener('click', handleStartRecording);
    recordBtn.addEventListener('click', handleStopRecording);
    recorder = new MediaRecorder(desktopStream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (event) => {
        videoUrl = URL.createObjectURL(event.data);
        previewVideo.srcObject = null;
        previewVideo.src = videoUrl;
        previewVideo.loop = true;
        previewVideo.play();
    };
    recorder.start();
    setTimeout(() => {
        recordBtn.textContent = 'Stop Recording';
        recordBtn.disabled = false;
    }, 3000);
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
