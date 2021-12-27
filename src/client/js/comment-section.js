const videoContainer = document.getElementById('video-container');
const commentForm = document.getElementById('comment-form');
const textarea = commentForm.querySelector('textarea');

const addComment = (text) => {
    const commentUl = document.querySelector('.watch-video__comment-list ul');
    const newCommentLi = document.createElement('li');
    const newCommentSpan = document.createElement('span');
    newCommentLi.className = 'comment-mixin__text';
    newCommentSpan.textContent = `${text}`;
    newCommentLi.appendChild(newCommentSpan);
    commentUl.prepend(newCommentLi);
};

const handleSubmit = async (event) => {
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
        const { status } = await fetch(`/api/videos/${videoId}/comment`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentText }),
        });
        if (status === 201) {
            addComment(commentText);
        }
    }
    if (textarea.value) {
        textarea.value = null;
    }
};

commentForm.addEventListener('submit', handleSubmit);
