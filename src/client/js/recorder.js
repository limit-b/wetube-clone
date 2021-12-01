const previewVideo = document.getElementById('preview-video');
const recordBtn = document.getElementById('record-btn');

const handleStartRecord = async () => {
    try {
        // const stream = await navigator.mediaDevices.getUserMedia({
        //     audio: false,
        //     video: true,
        // });
        const desktopStream = await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: { width: 1024, height: 576 },
        });
        previewVideo.srcObject = desktopStream;
        previewVideo.play();
    } catch (error) {
        console.log('stream error :', error);
    }
};

recordBtn.addEventListener('click', handleStartRecord);
