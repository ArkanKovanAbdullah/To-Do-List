/* eslint-disable brace-style, guard-for-in, max-len, no-loop-func, no-restricted-globals, no-underscore-dangle, no-use-before-define, no-useless-escape, prefer-const, prefer-rest-params */
/* eslint-disable class-methods-use-this, default-case, max-classes-per-file, max-len, no-continue, no-nested-ternary, no-plusplus, no-restricted-syntax, no-unused-vars */
/* eslint-disable */
export default class Collect {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('storedBooks')) || []; // Create an empty books array if there is no storted data in local storage with the key storedBooks.
  }
  removeBook = (index) => {
    this.books.splice(index, 1); // take off the index from array.
    window.localStorage.setItem('storedBooks', JSON.stringify(this.books));
    }
  displayBooks = () => {
    booksContainer.innerHTML = ''; // Make the book showing section empty
    for (let i = 0; i < this.books.length; i += 1) {
      const book = document.createElement('li'); // Each book, Each row.
      book.className = 'make-flex';
      book.classList.add('book-list')
      book.innerHTML = `<span class="title"> "${this.books[i].title}" by ${this.books[i].author}</span>`; // Give each row and each books its credintials. 
      const btn = document.createElement('button');
      btn.className = 'list-btn';
      btn.textContent = 'Remove';
      book.append(btn);
      btn.onclick = () => {
        this.removeBook(i);
        this.displayBooks();
      };
    booksContainer.append(book);
    listContainer.append(booksContainer);
    }
  }
  addBook = (title, author) => {
    this.books.push({ title, author });
    this.displayBooks();
  }
}

const listContainer = document.getElementById('list');
const booksContainer = document.createElement('ul');
const listOfBooksOnScreen = document.getElementById('list');
const addNewBookForm = document.getElementById('form-section');
const listBtn = document.getElementById('list-btn');
const addNewBtn = document.getElementById('add-new-btn');
const contact = document.getElementById('contact');
const contactBtn = document.getElementById('contact-btn');
const dateNow = document.getElementById('todays-date');

export {
  listContainer, booksContainer, listOfBooksOnScreen, addNewBookForm, listBtn, addNewBtn, contact, contactBtn, dateNow 
  };