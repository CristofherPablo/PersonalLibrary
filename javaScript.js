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
  {
    title: 'The Catcher In The Rye',
    author: 'J. D. Salinger',
    pages: 224,
    release: '1951',
    acquired: '11/05/2022',
    readStatus: false,
    index: 7,
  },
  {
    title: 'The Girl On The Train',
    author: 'Paula Hawkins',
    pages: 336,
    release: '2015',
    acquired: '02/15/2023',
    readStatus: false,
    index: 8,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
    release: '1925',
    acquired: '04/12/2023',
    readStatus: false,
    index: 9,
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    pages: 277,
    release: '07/16/1951',
    acquired: '06/25/2022',
    readStatus: true,
    index: 10,
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

function cleanForm() {
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

function toggleButton(button) {
  let index = parseInt(button.id);

  if (myLibrary[index].readStatus) {
    myLibrary[index].readStatus = false;
    cleanContainer();
    displayLibrary(myLibrary);
  } else {
    myLibrary[index].readStatus = true;
    cleanContainer();
    displayLibrary(myLibrary);
  }
}

function editBook() {
  let newTitle = document
    .getElementById('titleEdit')
    .value.replace(/^\s+|\s+$/gm, '');
  let newAuthor = document
    .getElementById('authorEdit')
    .value.replace(/^\s+|\s+$/gm, '');
  let newPages = parseInt(document.getElementById('pagesEdit').value);
  let release = document.getElementById('releaseEdit').value.split('-');
  let setDateRight =
    `${release[2]}` + '/' + `${release[1]}` + '/' + `${release[0]}`;
  release = setDateRight;
  let acquired = document.getElementById('acquiredEdit').value.split('-');
  setDateRight =
    `${acquired[2]}` + '/' + `${acquired[1]}` + '/' + `${acquired[0]}`;
  acquired = setDateRight;
  let newReadStatus = document.getElementById('readEdit').checked;

  let index = document.getElementById('acquiredEdit');
  index = index.getAttribute('data-index');

  myLibrary[index].title = newTitle;
  myLibrary[index].author = newAuthor;
  myLibrary[index].pages = newPages;
  myLibrary[index].release = release;
  myLibrary[index].acquired = acquired;
  myLibrary[index].readStatus = newReadStatus;

  
  cleanContainer();
  displayLibrary(myLibrary);
  cleanForm();
  closeEditPopUp();
}

function closeEditPopUp() {
  const editCard = document.querySelectorAll('.editBook');
  const overlay = document.getElementById('overlay');

  editCard.forEach((button) => {
    button.classList.remove('active');
  });

  overlay.classList.remove('active');
}

function displayEditPopUp() {
  const editCard = document.querySelectorAll('.editBook');
  const overlay = document.getElementById('overlay');

  editCard.forEach((button) => {
    button.classList.add('active');
  });

  overlay.classList.add('active');
}

function listenCloseEditBtn() {
  const cancelUpdate = document.querySelectorAll('#cancel');

  cancelUpdate.forEach(function (button) {
    button.addEventListener('click', () => {
      cleanForm();
      closeEditPopUp();
    });
  });
}

function fillFormEdit(edit) {
  // getting the index of the book to be deleted
  let editIndex = edit.alt.split(' ');
  editIndex = editIndex[3] * 1;

  //filling form
  document.getElementById('titleEdit').value = myLibrary[editIndex].title;
  document.getElementById('authorEdit').value = myLibrary[editIndex].author;
  document.getElementById('pagesEdit').value = myLibrary[editIndex].pages;

  //setting data to be like the default setting
  let dateString = myLibrary[editIndex].release;
  let [day, month, year] = dateString.split('/');
  let dateObj = new Date(year, month - 1, day);
  let formattedDate = dateObj.toISOString().split('T')[0];

  document.getElementById('releaseEdit').value = formattedDate;

  dateString = myLibrary[editIndex].acquired;
  [day, month, year] = dateString.split('/');
  dateObj = new Date(year, month - 1, day);
  formattedDate = dateObj.toISOString().split('T')[0];

  let settingIndex = document.getElementById('acquiredEdit');
  settingIndex.value = formattedDate;
  settingIndex.setAttribute('data-index', editIndex);

  if (myLibrary[editIndex].readStatus) {
    document.getElementById('readEdit').checked = true;
  } else {
    document.getElementById('readEdit').checked = false;
  }
}

function listenEditBtn() {
  const editButton = document.querySelectorAll('.edit');

  editButton.forEach(function (button) {
    button.addEventListener('click', (event) => {
      fillFormEdit(event.target);
      displayEditPopUp();
    });
  });
}

function listeningReadUnreadBtn() {
  let readUnreadBtn = document.querySelectorAll('.toggle-read');

  readUnreadBtn.forEach(function (button) {
    button.addEventListener('click', (event) => {
      toggleButton(event.target);
    });
  });
}

function updateMainHeader() {
  let total = document.getElementById('totalBooks');
  let read = document.getElementById('booksRead');
  let unread = document.getElementById('booksUnread');

  if (myLibrary.length === 0) {
    total.innerText = 0;
    read.innerText = 0;
    unread.innerText = 0;
    return;
  }

  let countTotal = myLibrary.length;
  let countRead = 0;
  let countUnRead = 0;

  myLibrary.forEach((book) => {
    if (book.readStatus) {
      countRead += 1;
    } else {
      countUnRead += 1;
    }
  });

  total.innerText = countTotal;
  read.innerText = countRead;
  unread.innerText = countUnRead;
}

function displayLibrary(myLibrary) {
  if (myLibrary.length === 0) {
    updateMainHeader();
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

    //creating the a button to toggle read/unread status
    const li6 = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('toggle-read');
    a.setAttribute('id', `${Book.index}`);
    if (Book.readStatus) {
      a.textContent = 'Read';
      a.classList.add('readBook');
    } else {
      a.textContent = 'Unread';
      a.classList.add('unReadBook');
    }
    li6.appendChild(a);
    // creating the imgs for delete and update
    const deleteImg = document.createElement('img');
    deleteImg.classList.add('deleteBook');
    deleteImg.setAttribute('Alt', 'delete image index ' + `${Book.index}`);
    deleteImg.src = 'assets/XDelete.png';
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('crudButton');
    deleteBtn.appendChild(deleteImg);

    const updateImg = document.createElement('img');
    updateImg.classList.add('edit');
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
  listeningReadUnreadBtn();
  listenEditBtn();
  updateMainHeader();
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
function validationForm(
  newTitle,
  newAuthor,
  newPages,
  newRelease,
  newAcquired
) {
  let title = document.getElementById(newTitle).value.replace(/\s+/g, '');
  let author = document.getElementById(newAuthor).value.replace(/\s+/g, '');
  let pages = parseInt(document.getElementById(newPages).value);
  let release = document.getElementById(newRelease).value;
  let acquired = document.getElementById(newAcquired).value;
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

let sendEditForm = document.getElementById('edit');
sendEditForm.addEventListener('click', (event) => {
 event.preventDefault();

  if (
    validationForm(
      'titleEdit',
      'authorEdit',
      'pagesEdit',
      'releaseEdit',
      'acquiredEdit'
    ) === 5
  ) {
    editBook();
  }
});

let addBookBnt = document.getElementById('addBook');

addBookBnt.addEventListener('click', (event) => {
  event.preventDefault();

  if (validationForm('title', 'author', 'pages', 'release', 'acquired') === 5) {
    addBookToLibrary();
  }
});

displayLibrary(myLibrary);
listenCloseEditBtn();
