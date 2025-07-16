// Do your work here...

const books = [];
const RENDER_EVENT = "render_book";
const STORAGE_KEY = "book_storage";

document.addEventListener(RENDER_EVENT, function () {
  const isCompletedBook = document.getElementById("completeBookList");
  isCompletedBook.innerHTML = "";

  const unCompletedBook = document.getElementById("incompleteBookList");
  unCompletedBook.innerHTML = "";

  for (const data of books) {
    const newBook = displayBook(data);
    if (data.isComplete) {
      isCompletedBook.append(newBook);
    } else {
      unCompletedBook.append(newBook);
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const formBtn = document.getElementById("bookForm");
  formBtn.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
    console.log(books);
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addBook() {
  const bookTitle = document.getElementById("bookFormTitle").value;
  const bookAuthor = document.getElementById("bookFormAuthor").value;
  const bookYears = document.getElementById("bookFormYear").value;
  const bookIsComplete = document.getElementById("bookFormIsComplete");
  const bookId = generateId();

  const year = Number(bookYears);
  const newBook = createNewBook(bookId, bookTitle, bookAuthor, year, bookIsComplete.checked);
  books.push(newBook);

  console.log(books);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function createNewBook(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

const generateId = () => {
  return +new Date();
};

function displayBook(book) {
  const listContainerBook = document.createElement("div");
  listContainerBook.setAttribute("data-bookid", book.id);
  listContainerBook.setAttribute("data-testid", "bookItem");

  const bookTitle = document.createElement("h3");
  bookTitle.setAttribute("data-testid", "bookItemTitle");
  bookTitle.innerText = `JUDUL : ${book.title}`;

  const bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("data-testid", "bookItemAuthor");
  bookAuthor.innerText = `Penulis : ${book.author}`;

  const bookYears = document.createElement("p");
  bookYears.setAttribute("data-testid", "bookItemYear");
  bookYears.innerText = `Tahun : ${book.year}`;

  const containerBtn = document.createElement("div");

  const buttonChecker = document.createElement("button");
  buttonChecker.innerText = !book.isComplete ? "selesai Dibaca" : "Belum Dibaca";
  buttonChecker.setAttribute("data-testid", "bookItemIsCompleteButton");

  const buttonRemove = document.createElement("button");
  buttonRemove.setAttribute("data-testid", "bookItemDeleteButton");
  buttonRemove.innerText = "Hapus Buku";
  buttonRemove.addEventListener("click", function () {
    removeBook(book.id);
  });

  const buttonEdit = document.createElement("button");
  buttonEdit.innerText = "Edit Buku";
  buttonEdit.setAttribute("data-testid", "bookItemEditButton");

  buttonEdit.addEventListener("click", function () {
    editBook(book); // kirim data buku ke fungsi edit
  });

  buttonChecker.addEventListener("click", function () {
    if (book.isComplete) {
      book.isComplete = false;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    } else {
      book.isComplete = true;
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
    }
  });

  containerBtn.append(buttonChecker, buttonRemove, buttonEdit);
  listContainerBook.append(bookTitle, bookAuthor, bookYears, containerBtn);
  return listContainerBook;
}

function findIndex(bookId) {
  for (let index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function removeBook(bookId) {
  const bookTarget = findIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBooks(bookTitle) {
  for (let book of books) {
    if (book.title === bookTitle) {
      return true;
    }
    return false;
  }
}

const buttonSearch = document.getElementById("searchSubmit");
buttonSearch.addEventListener("click", function (e) {
  e.preventDefault();
  const nameBook = document.getElementById("searchBookTitle").value;
  searchBook(nameBook);
});

function searchBook(bookname) {
  const bookTarget = findBooks(bookname);

  if (bookTarget) {
    alert(`buku yang kamu cari ada di bawah `);
  } else {
    alert("buku tidak ada ");
  }
}

function editBook(book) {
  const form = document.getElementById("bookForm");

  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;

  const buttonSubmit = document.getElementById("bookFormSubmit");
  buttonSubmit.innerText = "Simpan Perubahan";

  const clonedForm = form.cloneNode(true);
  form.parentNode.replaceChild(clonedForm, form);

  clonedForm.addEventListener("submit", function (e) {
    const updateTitle = document.getElementById("bookFormTitle").value;
    const updateAuthor = document.getElementById("bookFormAuthor").value;
    const updateYear = Number(document.getElementById("bookFormYear").value);
    const updateIsComplete = document.getElementById("bookFormIsComplete").checked;

    book.title = updateTitle;
    book.author = updateAuthor;
    book.year = updateYear;
    book.isComplete = updateIsComplete;

    clonedForm.reset();
    clonedForm.innerText = "Tambah Buku";

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  });
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const todo of data) {
      books.push(todo);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
