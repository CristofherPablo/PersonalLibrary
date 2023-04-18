import { myLibrary } from './bookData.js';
//function to clean the form fields
function cleanForm() {
  let form = document.querySelector('form');
  form.reset();
}

//function to get the information from the form
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

// get the book information and fill the form for editing

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

export { validationForm, retrieveFormInformation, cleanForm, fillFormEdit };
