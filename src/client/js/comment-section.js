const videoContainer = document.getElementById('video-container');
const commentForm = document.getElementById('comment-form');
const textarea = commentForm.querySelector('textarea');

const handleSubmit = (event) => {
    event.preventDefault();
    const { videoId } = videoContainer.dataset;
    const commentText = textarea.value;
    if (
        commentText === null ||
        commentText === undefined ||
        commentText === '' ||
        commentText.trim() === ''
    ) {
        return;
    } else {
        fetch(`/api/videos/${videoId}/comment`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentText }),
        });
    }
    if (textarea.value) {
        textarea.value = null;
    }
};

commentForm.addEventListener('submit', handleSubmit);
