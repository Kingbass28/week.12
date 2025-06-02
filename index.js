const apiUrl = "http://localhost:3000/books";
const bookList = document.getElementById("bookList");
const bookForm = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");

async function fetchBooks() {
  const response = await fetch(apiUrl);
  const books = await response.json();
  bookList.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${book.title}</strong> by ${book.author}
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
    `;
    bookList.appendChild(li);
  });
}

async function addBook(e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title && author) {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author })
    });
    titleInput.value = "";
    authorInput.value = "";
    fetchBooks();
  }
}

async function deleteBook(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  });
  fetchBooks();
}

bookForm.addEventListener("submit", addBook);
fetchBooks();
