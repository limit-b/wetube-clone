import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const previewVideo = document.getElementById('preview-video');
const actionBtn = document.getElementById('action-btn');

let videoUrl = null;
let mp4Url = null;
let thumbUrl = null;
let stopTimeoutID = null;
let recorder = null;
let desktopStream = null;

// URL.revokeObjectURL(videoUrl);
URL.revokeObjectURL(mp4Url);
URL.revokeObjectURL(thumbUrl);

const files = {
    input: 'recording.webm',
    output: 'output.mp4',
    thumbnail: 'thumbnail.jpg',
};

const transVideo = async () => {
    const ffmpeg = createFFmpeg({
        corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
        // corePath: '/static/ffmpeg-core.js',
        log: true,
    });
    try {
        await ffmpeg.load();
        ffmpeg.FS('writeFile', files.input, await fetchFile(videoUrl));
        await ffmpeg.run('-i', files.input, '-r', '60', files.output);
        await ffmpeg.run(
            '-i',
            files.input,
            '-ss',
            '00:00:01',
            '-frames:v',
            '1',
            files.thumbnail
        );
    } catch (error) {
        console.error('ffmpeg error :', error);
    }
    const mp4File = ffmpeg.FS('readFile', files.output);
    const thumbFile = ffmpeg.FS('readFile', files.thumbnail);
    const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
    const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' });
    mp4Url = URL.createObjectURL(mp4Blob);
    thumbUrl = URL.createObjectURL(thumbBlob);
    ffmpeg.FS('unlink', files.input);
    ffmpeg.FS('unlink', files.output);
    ffmpeg.FS('unlink', files.thumbnail);
    URL.revokeObjectURL(videoUrl);
    // URL.revokeObjectURL(mp4Url);
    // URL.revokeObjectURL(thumbUrl);
    videoUrl = null;
};

const downloadFile = (fileUrl, fileName) => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};

const handleDownload = async () => {
    actionBtn.removeEventListener('click', handleDownload);
    actionBtn.disabled = true;
    actionBtn.textContent = 'Downloading...';
    if (mp4Url === null && thumbUrl === null) {
        await transVideo();
    }
    downloadFile(mp4Url, 'MyRecording.mp4');
    downloadFile(thumbUrl, 'MyThumbnail.jpg');
    actionBtn.addEventListener('click', handleDownload);
    actionBtn.textContent = 'Download Recording';
    actionBtn.disabled = false;
};

const handleStopRecording = () => {
    if (stopTimeoutID) {
        clearTimeout(stopTimeoutID);
        stopTimeoutID = null;
    }
    actionBtn.removeEventListener('click', handleStopRecording);
    actionBtn.textContent = 'Download Recording';
    recorder.stop();
    actionBtn.addEventListener('click', handleDownload);
    desktopStream.getTracks().forEach((track) => track.stop());
    desktopStream = null;
    recorder = null;
};

const handleStartRecording = () => {
    actionBtn.removeEventListener('click', handleStartRecording);
    actionBtn.disabled = true;
    actionBtn.textContent = 'Recording...';
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
        actionBtn.addEventListener('click', handleStopRecording);
        actionBtn.textContent = 'Stop Recording';
        actionBtn.disabled = false;
    }, 1000);
    stopTimeoutID = setTimeout(handleStopRecording, 5000);
};

const handleReadyRecording = async () => {
    actionBtn.removeEventListener('click', handleReadyRecording);
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
    actionBtn.addEventListener('click', handleStartRecording);
    actionBtn.textContent = 'Start Recording';
};

actionBtn.addEventListener('click', handleReadyRecording);
