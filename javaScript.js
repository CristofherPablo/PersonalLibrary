let myLibrary = [];

function Book(title, author, pages, release, acquired, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.release = release;
  this.acquired = acquired;
  this.index = index;
}

function addBookToLibrary() {
  // do stuff here
}

//validating the form
function validationForm() {
  let title = document.getElementById('title').value.replace(/\s+/g, '');
  let author = document.getElementById('author').value.replace(/\s+/g, '');
  let pages = parseInt(document.getElementById('pages').value);
  let release = document.getElementById('release').value;
  let acquired = document.getElementById('acquired').value;
  let valid = 0;
  //let readStatus = document.getElementById('read').checked;

  if (title === '') {
    let p = document.querySelector('.validationSection.title');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.title');
    p.style.display = 'none';
    valid += 1;
  }

  if (author === '') {
    let p = document.querySelector('.validationSection.author');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.author');
    p.style.display = 'none';
    valid += 1;
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
    valid += 1;
  }

  if (release === '') {
    let p = document.querySelector('.validationSection.release');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.release');
    p.style.display = 'none';
    valid += 1;
  }

  if (acquired === '') {
    let p = document.querySelector('.validationSection.acquired');
    p.style.display = 'block';
  } else {
    let p = document.querySelector('.validationSection.acquired');
    p.style.display = 'none';
    valid += 1;
  }

  console.log(`${valid}`);
}

let addBookBnt = document.getElementById('addBook');
addBookBnt.addEventListener('click', (event) => {
  event.preventDefault();
  validationForm();
});
