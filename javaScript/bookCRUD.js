import { myLibrary } from './bookData.js';
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

  editBook = (bookToEdit) => {
    this.title = bookToEdit.title;
    this.author = bookToEdit.author;
    this.pages = bookToEdit.pages;
    this.release = bookToEdit.release;
    this.acquired = bookToEdit.acquired;
    this.readStatus = bookToEdit.readStatus;
  };

  static addBook = (bookInformation) => {

    let index = myLibrary.length;

    return new Book(
      bookInformation.title,
      bookInformation.author,
      bookInformation.pages,
      bookInformation.release,
      bookInformation.acquired,
      bookInformation.readStatus,
      index
    );
  };
}

export { Book };
