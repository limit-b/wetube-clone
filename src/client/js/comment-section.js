const videoContainer = document.getElementById('video-container');
const commentForm = document.getElementById('comment-form');
const textarea = commentForm.querySelector('textarea');
const commentUl = document.querySelector('.watch-video__comments ul');

const { videoId } = videoContainer.dataset;

const addComment = (text, id) => {
    const newLi = document.createElement('li');
    const newText = document.createElement('span');
    const newEdit = document.createElement('span');
    const newDelete = document.createElement('span');
    newLi.className = 'comment-mixin__li';
    newLi.dataset.id = id;
    newText.textContent = `${text}`;
    newEdit.className = 'comment-mixin__edit';
    newEdit.textContent = 'Edit Comment';
    newDelete.className = 'comment-mixin__delete';
    newDelete.textContent = 'Delete Comment';
    newLi.appendChild(newText);
    newLi.appendChild(newEdit);
    newLi.appendChild(newDelete);
    commentUl.prepend(newLi);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const commentText = textarea.value;
    if (
        commentText === null ||
        commentText === undefined ||
        commentText === '' ||
        commentText.trim() === ''
    ) {
        return;
    } else {
        const response = await fetch(`/api/videos/${videoId}/comment`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentText }),
        });
        if (response.status === 201) {
            const { newCommentId } = await response.json();
            addComment(commentText, newCommentId);
        }
    }
    if (textarea.value) {
        textarea.value = null;
    }
};

const deleteComment = async (event) => {
    const commentLi = event.target.parentNode;
    const { commentId } = commentLi.dataset;
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId }),
    });
    if (response.status === 200) {
        commentUl.removeChild(commentLi);
    }
};

commentForm.addEventListener('submit', handleSubmit);
if (commentUl.childNodes) {
    const commentDeleteAll = commentUl.querySelectorAll(
        '.comment-mixin__delete'
    );
    commentDeleteAll.forEach((commentDelete) =>
        commentDelete.addEventListener('click', deleteComment)
    );
}
