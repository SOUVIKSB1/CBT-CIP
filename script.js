// DOM Elements
const accountModal = document.getElementById('account-modal');
const createAccountBtn = document.getElementById('createAccountBtn');
const usernameInput = document.getElementById('username');
const postBtn = document.getElementById('postBtn');
const postsContainer = document.getElementById('postsContainer');
const logoutBtn = document.getElementById('logoutBtn');

let currentUser = null;

// Account Creation
createAccountBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) {
        alert('Please enter a username!');
        return;
    }
    currentUser = username;
    accountModal.style.display = 'none';
    logoutBtn.classList.remove('hidden');
    alert(`Welcome, ${currentUser}!`);
});

// Logout
logoutBtn.addEventListener('click', () => {
    currentUser = null;
    accountModal.style.display = 'flex';
    logoutBtn.classList.add('hidden');
});

// Create Post
postBtn.addEventListener('click', () => {
    if (!currentUser) {
        alert('Please log in to create a post!');
        return;
    }

    const content = document.getElementById('postContent').value.trim();
    if (!content) {
        alert('Post content cannot be empty!');
        return;
    }

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <h3>${currentUser}</h3>
        <p>${content}</p>
        <div class="post-actions">
            <button class="like-btn">❤️ Like <span class="like-count">0</span></button>
            <button class="share-btn">🔗 Share <span class="share-count">0</span></button>
        </div>
        <div class="comment-section">
            <input type="text" placeholder="Add a comment..." class="comment-input">
            <div class="comments"></div>
        </div>
    `;

    // Like Button Functionality
    const likeBtn = postDiv.querySelector('.like-btn');
    const likeCount = likeBtn.querySelector('.like-count');
    likeBtn.addEventListener('click', () => {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
    });

    // Share Button Functionality
    const shareBtn = postDiv.querySelector('.share-btn');
    const shareCount = shareBtn.querySelector('.share-count');
    shareBtn.addEventListener('click', () => {
        shareCount.textContent = parseInt(shareCount.textContent) + 1;
        navigator.clipboard.writeText(content);
        alert('Post content copied to clipboard!');
    });

    // Comment Functionality
    const commentInput = postDiv.querySelector('.comment-input');
    const commentsDiv = postDiv.querySelector('.comments');
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim()) {
            const comment = document.createElement('p');
            comment.textContent = `${currentUser}: ${commentInput.value.trim()}`;
            commentsDiv.appendChild(comment);
            commentInput.value = '';
        }
    });

    postsContainer.prepend(postDiv);
    document.getElementById('postContent').value = '';
});