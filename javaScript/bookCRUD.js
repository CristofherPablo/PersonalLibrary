import { getMyLibrary, myLibrary } from './bookData.js';
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

  deleteBook = () => {
    // getting the index of the book to be deleted
    const deleteIndex = myLibrary.indexOf(this);

    // update the index property of each book after the deleted book
    for (let i = deleteIndex + 1; i < myLibrary.length; i++) {
      myLibrary[i].index--;
    }

    myLibrary.splice(this.index, 1);
  };

  editBook = () => {
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
}

export { Book };
