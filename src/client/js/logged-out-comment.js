const commentForm = document.getElementById('comment-form');
const commentTextarea = commentForm.querySelector('textarea');
const commentBtn = commentForm.querySelector('button');

const handleLoggedOut = (event) => {
    event.preventDefault();
    window.location.href = '/login';
    return false;
};

const handleTabDisable = (event) => {
    const { key } = event;
    if (key === 'Tab') {
        commentTextarea.setAttribute('tabindex', '-1');
        commentBtn.setAttribute('tabindex', '-1');
    }
};

commentForm.addEventListener('click', handleLoggedOut);
commentForm.addEventListener('contextmenu', handleLoggedOut);
commentTextarea.addEventListener('focus', handleLoggedOut);
commentTextarea.addEventListener('dragstart', handleLoggedOut);
commentTextarea.addEventListener('selectstart', handleLoggedOut);
commentTextarea.addEventListener('keyup', handleLoggedOut);
commentBtn.addEventListener('focus', handleLoggedOut);
commentBtn.addEventListener('dragstart', handleLoggedOut);
commentBtn.addEventListener('selectstart', handleLoggedOut);
document.addEventListener('keydown', handleTabDisable);
