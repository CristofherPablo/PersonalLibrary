let myLibrary = [];

class Book {
  constructor(title, author, pages, release, acquired, readStatus, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.release = release;
    this.acquired = acquired;
    this.readStatus = readStatus;
    this.index = index;
  }
}

function displayLibrary() {
  if (myLibrary.length === 0) {
    return;
  }

  const container = document.getElementById('tableContainer');

  myLibrary.forEach(function (Book) {
    const div = document.createElement('div');
    div.classList.add('tableContent');

    const ul = document.createElement('ul');
    ul.classList.add('grid-style');

    const li1 = document.createElement('li');
    li1.textContent = `${Book.title}`;

    const li2 = document.createElement('li');
    li2.textContent = `${Book.author}`;

    const li3 = document.createElement('li');
    li3.textContent = `${Book.pages}`;

    const li4 = document.createElement('li');
    li4.textContent = `${Book.release}`;

    const li5 = document.createElement('li');
    li5.textContent = `${Book.acquired}`;

    const li6 = document.createElement('li');
    if (Book.readStatus) {
      li6.textContent = 'Read';
    } else {
      li6.textContent = 'Unread';
    }

    //append all to form the structure

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    div.appendChild(ul);

    //append it to the table wrapper
    container.appendChild(div);
  });
}

function alreadyAdd(titleNewBook) {
  let newBook = titleNewBook.replace(/\s+/g, '').toLowerCase();

  for (let i = 0; i < myLibrary.length; i++) {
    let currentBook = myLibrary[i].title;
    currentBook = currentBook.replace(/\s+/g, '').toLowerCase();
    if (newBook === currentBook) {
      return true;
    }
  }
  return false;
}

function addBookToLibrary() {
  let title = document.getElementById('title').value.replace(/^\s+|\s+$/gm, '');
  let author = document
    .getElementById('author')
    .value.replace(/^\s+|\s+$/gm, '');
  let pages = parseInt(document.getElementById('pages').value);
  let release = document.getElementById('release').value.split('-');
  let acquired = document.getElementById('acquired').value.split('-');
  let readStatus = document.getElementById('read').checked;
  let index = myLibrary.length;

  let newBook = new Book(
    title,
    author,
    pages,
    release,
    acquired,
    readStatus,
    index
  );

  if (myLibrary.length === 0) {
    myLibrary.push(newBook);
    displayLibrary();
  } else {
    if (alreadyAdd(newBook.title)) {
      return;
    } else {
      myLibrary.push(newBook);
      displayLibrary();
    }
  }
}

//validating the form
function validationForm() {
  let title = document.getElementById('title').value.replace(/\s+/g, '');
  let author = document.getElementById('author').value.replace(/\s+/g, '');
  let pages = parseInt(document.getElementById('pages').value);
  let release = document.getElementById('release').value;
  let acquired = document.getElementById('acquired').value;
  let isValid = 0;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (title === '') {
    let p = document.querySelector('.validationSection.title');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.title');
    p.style.display = 'none';
    isValid += 1;
  }

  if (author === '') {
    let p = document.querySelector('.validationSection.author');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.author');
    p.style.display = 'none';
    isValid += 1;
  }

  if (isNaN(pages)) {
    let p2 = document.querySelector('.validationSection.pages.err');
    p2.style.display = 'none';

    let p = document.querySelector('.validationSection.pages');
    p.style.display = 'block';
  } else if (pages < 1 || pages > 9999) {
    let p = document.querySelector('.validationSection.pages');
    p.style.display = 'none';

    let p2 = document.querySelector('.validationSection.pages.err');
    p2.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.pages');
    p.style.display = 'none';

    let p2 = document.querySelector('.validationSection.pages.err');
    p2.style.display = 'none';
    isValid += 1;
  }

  if (release === '') {
    let p = document.querySelector('.validationSection.release');
    let pErr = document.querySelector('.validationSection.release.err');
    pErr.style.display = 'none';
    p.style.display = 'block';
  } else {
    let checkDate = release.split('-');
    let p = document.querySelector('.validationSection.release');
    let pErr = document.querySelector('.validationSection.release.err');

    if (checkDate[0].length > 4) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else if (checkDate[0] > currentYear) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else {
      p.style.display = 'none';
      pErr.style.display = 'none';
      isValid += 1;
    }
  }

  if (acquired === '') {
    let p = document.querySelector('.validationSection.acquired');
    let pErr = document.querySelector('.validationSection.acquired.err');
    pErr.style.display = 'none';
    p.style.display = 'block';
  } else {
    let checkDate = acquired.split('-');
    let p = document.querySelector('.validationSection.acquired');
    let pErr = document.querySelector('.validationSection.acquired.err');

    if (checkDate[0].length > 4) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else if (checkDate[0] > currentYear) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else {
      p.style.display = 'none';
      pErr.style.display = 'none';
      isValid += 1;
    }
  }

  return isValid;
}

let addBookBnt = document.getElementById('addBook');

addBookBnt.addEventListener('click', (event) => {
  event.preventDefault();

  if (validationForm() === 5) {
    addBookToLibrary();
  }
});
