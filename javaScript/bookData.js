import {Book} from './bookCRUD.js';

let myLibrary = [];
let localDataBase = [
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

  localDataBase.forEach((book) => {
    let newBook = new Book(
      book.title,
      book.author,
      book.pages,
      book.release,
      book.acquired,
      book.readStatus,
      book.index
    );
  
    if (myLibrary.length === 0) {
      myLibrary.push(newBook);  
    } else {
      if (alreadyAdd(newBook.title)) {
        return;
      } else {
        myLibrary.push(newBook);
      }
    }
  });

  function getMyLibrary () {
    return myLibrary
  }

  export {getMyLibrary, myLibrary};