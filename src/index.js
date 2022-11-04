import Collect from './class.js';
import * as variables from './class.js';
import * as luxon from './luxon.js';

variables.booksContainer.classList.add('books-list');
const bookie = new Collect();
bookie.displayBooks();

document.forms[0].onsubmit = (event) => {
  event.preventDefault();
  const thisForm = event.target;
  const title = thisForm[0].value;
  const author = thisForm[1].value;

  if (title === '' || author === '') {
    const section = document.getElementById('form-section');
    const message = document.createElement('p');
    message.innerHTML = 'Please put something into the fields';
    section.insertAdjacentElement('afterend', message);
    setTimeout(() => { message.remove(); }, 3000);
  } else {
    bookie.addBook(title, author);
    thisForm[0].value = '';
    thisForm[1].value = '';
  }
  window.localStorage.setItem('storedBooks', JSON.stringify(bookie.books));
};

variables.listBtn.addEventListener('click', () => {
  variables.listOfBooksOnScreen.classList.remove('display-none');
  variables.addNewBookForm.classList.add('display-none');
  variables.contact.classList.add('display-none');
});

variables.addNewBtn.addEventListener('click', () => {
  variables.listOfBooksOnScreen.classList.add('display-none');
  variables.addNewBookForm.classList.remove('display-none');
  variables.contact.classList.add('display-none');
});

variables.contactBtn.addEventListener('click', () => {
  variables.listOfBooksOnScreen.classList.add('display-none');
  variables.addNewBookForm.classList.add('display-none');
  variables.contact.classList.remove('display-none');
});

const now = luxon.DateTime.now();
const nowYear = now.year;
const nowMonth = now.month;
const nowDay = now.day;
const nowHour = now.hour;
const nowMinute = now.minute;
const nowSecond = now.second;
variables.dateNow.innerHTML = `${nowYear}/${nowMonth}/${nowDay}, ${nowHour}:${nowMinute}:${nowSecond}`;