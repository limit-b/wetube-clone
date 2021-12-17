const videoContainer = document.getElementById('video-container');
const commentForm = document.getElementById('comment-form');
const textarea = commentForm.querySelector('textarea');

const handleSubmit = (event) => {
    event.preventDefault();
    const { videoId } = videoContainer.dataset;
    const commentText = textarea.value;
    console.log(commentText);
    fetch(`/api/videos/${videoId}/comment`, {
        method: 'post',
        body: { commentText },
    });
    if (textarea.value) {
        textarea.value = null;
    }
};

commentForm.addEventListener('submit', handleSubmit);
