import { getMyLibrary, myLibrary } from './bookData.js';
import { Book } from './bookCRUD.js';

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
function validationForm(bookInformation, formType) {
  let isValid = 0;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (bookInformation.title === '') {
    let p = document.querySelector(`.validationSection.${formType}Title`);
    p.style.display = 'block';
  } else {
    let p = document.querySelector(`.validationSection.${formType}Title`);
    p.style.display = 'none';
    isValid += 1;
  }

  if (bookInformation.author === '') {
    let p = document.querySelector(`.validationSection.${formType}Author`);
    p.style.display = 'block';
  } else {
    let p = document.querySelector(`.validationSection.${formType}Author`);
    p.style.display = 'none';
    isValid += 1;
  }

  if (isNaN(bookInformation.pages)) {
    let p2 = document.querySelector(`.validationSection.${formType}Pages.err`);
    p2.style.display = 'none';

    let p = document.querySelector(`.validationSection.${formType}Pages`);
    p.style.display = 'block';
  } else if (bookInformation.pages < 1 || bookInformation.pages > 9999) {
    let p = document.querySelector(`.validationSection.${formType}Pages`);
    p.style.display = 'block';

    let p2 = document.querySelector(`.validationSection.${formType}Pages.err`);
    p2.style.display = 'none';
  } else {
    let p = document.querySelector(`.validationSection.${formType}Pages`);
    p.style.display = 'none';

    let p2 = document.querySelector(`.validationSection.${formType}Pages.err`);
    p2.style.display = 'none';
    isValid += 1;
  }

  if (bookInformation.release === '') {
    let p = document.querySelector(`.validationSection.${formType}Release`);
    let pErr = document.querySelector(
      `.validationSection.${formType}Release.err`
    );
    pErr.style.display = 'none';
    p.style.display = 'block';
  } else {
    let checkDate = bookInformation.release.split('/');
    let p = document.querySelector(`.validationSection.${formType}Release`);
    let pErr = document.querySelector(
      `.validationSection.${formType}Release.err`
    );

    if (checkDate[2].length > 4) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else if (checkDate[2] > currentYear) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else {
      p.style.display = 'none';
      pErr.style.display = 'none';
      isValid += 1;
    }
  }

  if (bookInformation.acquired === '') {
    let p = document.querySelector(`.validationSection.${formType}Acquired`);
    let pErr = document.querySelector(
      `.validationSection.${formType}Acquired.err`
    );
    pErr.style.display = 'none';
    p.style.display = 'block';
  } else {
    let checkDate = bookInformation.acquired.split('/');
    let p = document.querySelector(`.validationSection.${formType}Acquired`);
    let pErr = document.querySelector(
      `.validationSection.${formType}Acquired.err`
    );

    if (checkDate[2].length > 4) {
      p.style.display = 'none';
      pErr.style.display = 'block';
    } else if (checkDate[2] > currentYear) {
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
    console.log('entrou');
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
