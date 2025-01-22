const postsContainer = document.getElementById("posts-container");
const mostLikedPostsContainer = document.getElementById("most-liked-posts");
const lastPostContainer = document.getElementById("last-post");
const form = document.getElementById("new-post-form");
const postTitle = document.getElementById("post-title");
const postBody = document.getElementById("post-body");
const postAuthor = document.getElementById("post-author");

// Array para armazenar os posts temporariamente
let posts = [];

/// Função para renderizar os posts
function renderPosts() {
  postsContainer.innerHTML = ""; // Limpa o container de posts

  // Renderiza cada post
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card", "mb-3", "w-100"); // Adiciona largura total aos posts

    postElement.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <p><small><strong>Date:</strong> ${post.date}</small></p>
            <button class="btn btn-outline-success" onclick="addLike(${index})">
                Like <span id="like-count-${index}">${post.likes}</span>
            </button>
            <button class="btn btn-outline-danger ms-3" onclick="deletePost(${index})">
                Delete Post
            </button>
            <button class="btn btn-outline-info ms-3" onclick="toggleCommentForm(${index})">
                Comentários
            </button>

            <div id="comment-form-${index}" class="mt-3" style="display: none;">
                <input type="text" id="comment-name-${index}" placeholder="Seu nome" class="form-control mb-2" required>
                <textarea id="comment-body-${index}" placeholder="Seu comentário" class="form-control mb-2" rows="3" required></textarea>
                <button class="btn btn-primary" onclick="addComment(${index})">Comentar</button>
                <div id="comments-${index}" class="mt-3">
                    <!-- Comentários aparecerão aqui -->
                </div>
            </div>
        </div>
    `;

    postsContainer.appendChild(postElement);

    // Renderiza os comentários do post
    renderComments(index);
  });

  // Atualiza o post com mais likes
  renderMostLikedPost();

  // Exibe uma mensagem se não houver posts
  if (posts.length === 0) {
    postsContainer.innerHTML = `<p class="text-white">Nenhum post ainda. Seja o primeiro a publicar!</p>`;
  }
}

// Função para renderizar os comentários de um post
function renderComments(postIndex) {
  const commentsContainer = document.getElementById(`comments-${postIndex}`);
  commentsContainer.innerHTML = ""; // Limpa os comentários existentes

  posts[postIndex].comments.forEach((comment, commentIndex) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("mb-2");
    commentElement.innerHTML = `
            <p><strong>${comment.name}:</strong> ${comment.body}</p>
            <p><small><strong>Date:</strong> ${comment.date}</small></p>
            <button class="btn btn-outline-success" onclick="addCommentLike(${postIndex}, ${commentIndex})">
                Like <span>${comment.likes}</span>
            </button>
            <button class="btn btn-outline-danger ms-3" onclick="deleteComment(${postIndex}, ${commentIndex})">
                Delete Comment
            </button>
        `;
    commentsContainer.appendChild(commentElement);
  });
}

// Função para exibir o post com mais likes
function renderMostLikedPost() {
  if (posts.length === 0) {
    mostLikedPostsContainer.innerHTML = `<p class="text-white">No popular post available to display.</p>`;
    return;
  }

  const mostLikedPost = posts.reduce((maxPost, currentPost) => {
    return currentPost.likes > maxPost.likes ? currentPost : maxPost;
  });

  mostLikedPostsContainer.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${mostLikedPost.title}</h5>
                <p class="card-text">${mostLikedPost.body}</p>
                <p><strong>Author:</strong> ${mostLikedPost.author}</p>
                <p><small><strong>Date:</strong> ${mostLikedPost.date}</small></p>
                <p><strong>Likes:</strong> ${mostLikedPost.likes}</p>
            </div>
        </div>
    `;
}

// Função para adicionar um comentário
function addComment(postIndex) {
  const commentName = document.getElementById(
    `comment-name-${postIndex}`
  ).value;
  const commentBody = document.getElementById(
    `comment-body-${postIndex}`
  ).value;

  if (!commentName || !commentBody) {
    alert("Por favor, preencha todos os campos de comentário.");
    return;
  }

  const newComment = {
    name: commentName,
    body: commentBody,
    likes: 0,
    date: new Date().toLocaleString(),
  };

  posts[postIndex].comments.push(newComment);

  renderComments(postIndex);
  document.getElementById(`comment-name-${postIndex}`).value = "";
  document.getElementById(`comment-body-${postIndex}`).value = "";
}
//Mostrar ou esconder os comentarios
function toggleCommentForm(postIndex) {
  const commentForm = document.getElementById(`comment-form-${postIndex}`);
  if (
    commentForm.style.display === "none" ||
    commentForm.style.display === ""
  ) {
    commentForm.style.display = "block";
  } else {
    commentForm.style.display = "none";
  }
}

// Função para adicionar um like a um comentário
function addCommentLike(postIndex, commentIndex) {
  posts[postIndex].comments[commentIndex].likes++;
  renderComments(postIndex);
}
//adicionar um like
function addLike(postIndex) {
  posts[postIndex].likes++;
  renderPosts(); // Re-renderiza os posts para atualizar a contagem de likes
}

// Função para excluir um comentário
function deleteComment(postIndex, commentIndex) {
  posts[postIndex].comments.splice(commentIndex, 1);
  renderComments(postIndex);
}

// Função para excluir um post
function deletePost(postIndex) {
  if (confirm("Tem certeza que deseja excluir este post?")) {
    posts.splice(postIndex, 1);
    renderPosts();
    renderLastPost();
  }
}
//renderizar o ultimo post
function renderLastPost() {
  if (posts.length === 0) {
    lastPostContainer.innerHTML = `<p class="text-muted">Nenhum post disponível.</p>`;
    return;
  }

  const lastPost = posts[posts.length - 1];

  lastPostContainer.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${lastPost.title}</h5>
                <p class="card-text">${lastPost.body}</p>
                <p><strong>Author:</strong> ${lastPost.author}</p>
                <p><small><strong>Date:</strong> ${lastPost.date}</small></p>
            </div>
        </div>
    `;
}

// EEnvio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newPost = {
    title: postTitle.value,
    body: postBody.value,
    author: postAuthor.value,
    likes: 0,
    comments: [],
    date: new Date().toLocaleString(),
  };

  posts.push(newPost);

  postTitle.value = "";
  postBody.value = "";
  postAuthor.value = "";

  renderPosts();
  renderLastPost();
});

// Inicializa a renderização dos posts ao carregar a página
renderPosts();
