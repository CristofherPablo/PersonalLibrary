let myLibrary = [
  {
    title: 'The Lord of the Rings - The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    pages: 423,
    release: '29/07/1954',
    acquired: '10/06/2021',
    readStatus: true,
    index: 0,
  },
  {
    title: 'The Lord of the Rings - The Two Towers',
    author: 'J.R.R. Tolkien',
    pages: 352,
    release: '11/11/1954',
    acquired: '12/06/2021',
    readStatus: false,
    index: 1,
  },
  {
    title: 'The Lord of the Rings - The Return of the King',
    author: 'J.R.R. Tolkien',
    pages: 416,
    release: '20/10/1955',
    acquired: '14/06/2021',
    readStatus: false,
    index: 2,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    pages: 223,
    release: '26/06/1997',
    acquired: '15/06/2021',
    readStatus: true,
    index: 3,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 300,
    release: '21/09/1937',
    acquired: '16/06/2021',
    readStatus: true,
    index: 4,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 281,
    release: '07/11/1960',
    acquired: '05/12/2022',
    readStatus: true,
    index: 5,
  },
  {
    title: '1984',
    author: 'George Orwell',
    pages: 328,
    release: '06/08/1949',
    acquired: '09/23/2021',
    readStatus: true,
    index: 6,
  },
];

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

function deleteBook(img) {
  
  // getting the index of the book to be deleted
  let deleteIndex = img.alt.split(' ');
  deleteIndex = deleteIndex[3] * 1;
  
  myLibrary.forEach((book) => {
    if (book.index > deleteIndex) {
      book.index = book.index - 1;
    }
  });

  myLibrary.splice(deleteIndex, 1);
  cleanContainer();
  displayLibrary(myLibrary);
  
}

function cleanForm () {
  let form = document.querySelector('form');
  form.reset();
}

function listeningDeleteBtn() {
  let deleteBookBnt = document.querySelectorAll('.deleteBook');
  deleteBookBnt.forEach(function (button) {
    button.addEventListener('click', (event) => {
      deleteBook(event.target);
    });
  });
}

function displayLibrary(myLibrary) {
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
    // creating the imgs for delete and update
    const deleteImg = document.createElement('img');
    deleteImg.classList.add('deleteBook');
    deleteImg.setAttribute('Alt', 'delete image index ' + `${Book.index}`);
    deleteImg.src = 'assets/XDelete.png';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('crudButton');
    deleteBtn.appendChild(deleteImg);

    const updateImg = document.createElement('img');
    updateImg.classList.add('editBook');
    updateImg.setAttribute('Alt', 'update image index ' + `${Book.index}`);
    updateImg.src = 'assets/edit.png';
    const updateBtn = document.createElement('button');
    updateBtn.classList.add('crudButton');
    updateBtn.appendChild(updateImg);

    const li7 = document.createElement('li');
    li7.appendChild(deleteBtn);
    li7.appendChild(updateBtn);

    //append all to form the structure

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);
    div.appendChild(ul);

    //append it to the table wrapper
    container.appendChild(div);
  });

  listeningDeleteBtn();
}

function cleanContainer() {
  const container = document.getElementById('tableContainer');
  container.innerHTML = '';
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
  let setDateRight =
    `${release[2]}` + '/' + `${release[1]}` + '/' + `${release[0]}`;
  release = setDateRight;
  let acquired = document.getElementById('acquired').value.split('-');
  setDateRight =
    `${acquired[2]}` + '/' + `${acquired[1]}` + '/' + `${acquired[0]}`;
  acquired = setDateRight;
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

  cleanForm();

  if (myLibrary.length === 0) {
    myLibrary.push(newBook);
    cleanContainer();
    displayLibrary(myLibrary);

    console.log(newBook);
  } else {
    if (alreadyAdd(newBook.title)) {
      return;
    } else {
      myLibrary.push(newBook);
      cleanContainer();
      displayLibrary(myLibrary);
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

displayLibrary(myLibrary);
