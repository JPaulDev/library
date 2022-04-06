const bookForm = document.querySelector('.book-form');
const bookContainer = document.querySelector('.book-container');

const myLibrary = [];

function CreateBook(title, author, pages, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.finished = finished;
}

function addBook(title, author, pages, finished) {
  let hasFinished;
  finished ? (hasFinished = true) : (hasFinished = false);
  const book = new CreateBook(title, author, pages, hasFinished);
  myLibrary.push(book);
}

function removeBook() {
  const index = this.parentNode.dataset.arrayIndex;
  myLibrary.splice(index, 1);
  document.querySelector(`[data-array-index="${index}"]`).remove();
}

function createBookCard(book, index) {
  const bookCard = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const bookPages = document.createElement('p');
  const bookFinished = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  bookCard.dataset.arrayIndex = index;
  bookTitle.innerText = book.title;
  bookAuthor.innerText = book.author;
  bookPages.innerText = book.pages;
  removeBtn.innerText = 'Remove';
  removeBtn.onclick = removeBook;
  if (book.finished) {
    bookFinished.classList.add('finished');
    bookFinished.innerText = 'Finished';
  } else {
    bookFinished.classList.add('not-finished');
    bookFinished.innerText = 'Not Finished';
  }

  bookCard.append(bookTitle, bookAuthor, bookPages, bookFinished, removeBtn);
  return bookCard;
}

function updateBookContainer() {
  bookContainer.replaceChildren();
  myLibrary.forEach((book, index) => {
    const bookCard = createBookCard(book, index);
    bookContainer.appendChild(bookCard);
  });
}

bookForm.addEventListener('submit', (ev) => {
  const fd = new FormData(bookForm);

  ev.preventDefault();
  addBook(...fd.values());
  updateBookContainer();
  bookForm.reset();
});
