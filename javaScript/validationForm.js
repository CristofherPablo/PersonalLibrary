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

  export {validationForm};