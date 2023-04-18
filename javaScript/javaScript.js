import { myLibrary } from './bookData.js';
import { Book } from './bookCRUD.js';
import { validationForm } from './validationForm.js';

function cleanForm() {
  let form = document.querySelector('form');
  form.reset();
}

function findIndexBook(targetBook) {
  let index = targetBook.alt.split(' ');
  index = index[3] * 1;
  return index;
}

function listeningDeleteBtn() {
  let deleteBookBnt = document.querySelectorAll('.deleteBook');
  deleteBookBnt.forEach(function (button) {
    button.addEventListener('click', (event) => {
      myLibrary[findIndexBook(event.target)].deleteBook();
      cleanContainer();
      displayLibrary(myLibrary);
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

function fillFormEdit(editIndex) {
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
let bookEditIndex = -1;

function listenEditBtn() {
  const editButton = document.querySelectorAll('.edit');

  editButton.forEach(function (button) {
    button.addEventListener('click', (event) => {
      bookEditIndex = findIndexBook(event.target);
      fillFormEdit(bookEditIndex);
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

function retrieveFormInformation(
  getTitle,
  getAuthor,
  getPages,
  getRelease,
  getAcquired,
  getReadStatus
) {
  let title = document
    .getElementById(getTitle)
    .value.replace(/^\s+|\s+$/gm, '');
  let author = document
    .getElementById(getAuthor)
    .value.replace(/^\s+|\s+$/gm, '');
  let pages = parseInt(document.getElementById(getPages).value);
  let release = document.getElementById(getRelease).value.split('-');
  let acquired = document.getElementById(getAcquired).value.split('-');
  let readStatus = document.getElementById(getReadStatus).checked;

  //Checking if the date is invalid
  let setDateRight;
  if (release[0] === '' || release[1] === '' || release[2] === '') {
    release = '';
  } else {
    //setting dates to the format of DD/MM/YYYY
    setDateRight =
      `${release[2]}` + '/' + `${release[1]}` + '/' + `${release[0]}`;
    release = setDateRight;
  }

  if (acquired[0] === '' || acquired[1] === '' || acquired[2] === '') {
    acquired = '';
  } else {
    setDateRight =
      `${acquired[2]}` + '/' + `${acquired[1]}` + '/' + `${acquired[0]}`;
    acquired = setDateRight;
  }

  // Return object with all the form data
  return {
    title: title,
    author: author,
    pages: pages,
    release: release,
    acquired: acquired,
    readStatus: readStatus,
  };
}

let sendEditForm = document.getElementById('edit');
sendEditForm.addEventListener('click', (event) => {
  event.preventDefault();

  let bookInformation = retrieveFormInformation(
    'titleEdit',
    'authorEdit',
    'pagesEdit',
    'releaseEdit',
    'acquiredEdit',
    'readEdit'
  );

  if (validationForm(bookInformation, 'edit') === 5 && bookEditIndex != -1) {
    myLibrary[bookEditIndex].editBook(bookInformation);
    cleanContainer();
    displayLibrary(myLibrary);
    cleanForm();
    closeEditPopUp();
  }
});

//Adding an event listener and adding a book to the array.
let addBookBnt = document.getElementById('addBook');

addBookBnt.addEventListener('click', (event) => {
  event.preventDefault();

  let bookInformation = retrieveFormInformation(
    'title',
    'author',
    'pages',
    'release',
    'acquired',
    'read'
  );
  //verifying if the book is already registered.
  if (alreadyAdd(bookInformation.title)) {
    return;
    //validating the form 
  } else if (validationForm(bookInformation, 'add') === 5) {
    myLibrary[myLibrary.length] = Book.addBookToLibrary(bookInformation);
    cleanContainer();
    displayLibrary(myLibrary);
  }
});

displayLibrary(myLibrary);
listenCloseEditBtn();
