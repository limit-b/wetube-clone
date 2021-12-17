const commentForm = document.getElementById('comment-form');

const handleLoggedOut = (event) => {
    event.preventDefault();
    window.location.href = '/login';
};

commentForm.addEventListener('click', handleLoggedOut);
