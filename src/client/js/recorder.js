const start = document.getElementById('startBtn');

const handleStart = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        console.log(stream);
    } catch (error) {
        console.log(error);
    }
};

start.addEventListener('click', handleStart);
