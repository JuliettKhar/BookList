let form;
let title;
let author;
let isbn;
let list;
let container;
let alert;
let books;

function findElements() {
	form = document.querySelector('#book-form');
	title = form.querySelector('#title');
	author = form.querySelector('#author');
	isbn = form.querySelector('#isbn');
	list = document.querySelector('#book-list');
	container = document.querySelector('.container');
}

class Book {
		constructor(title, author, isbn) {
			this.title = title;
			this.author = author;
			this.isbn = isbn;
		}
}

class UI {
	showAlert(message, className) {
			const div = document.createElement('div');
			div.className= `alert ${className}`;
			div.appendChild(document.createTextNode(message));
			container.insertBefore(div, form);
	}

addBookToList(book) {
const row = document.createElement('tr');
			row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="delete">X</a></td>
		`;
		list.appendChild(row);
}

clearFields () {
	title.value = ''; 
	author.value = '';
	isbn.value = '';
}

deleteBookfromList(target) {
	if(target.className === 'delete') target.parentElement.parentElement.remove();
}
}

class Store {
	static getBooks() {
		let books;
		if(localStorage.getItem('books') == null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(book => {
			const ui = new UI;
			ui.addBookToList(book);
		});
	}
	static addBooks(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach( (book, index) => {
			if(book.isbn === isbn)
					books.splice(index, 1);
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
	
}

function removeAlert() {
	document.querySelector('.alert').remove();
}

function addBook(event) {
	event.preventDefault();
 addTitle = title.value;
 addAuthor = author.value;
 addIsbn = isbn.value;
 const book = new Book(addTitle, addAuthor, addIsbn);
 const ui = new UI();

 if(addTitle === '' || addAuthor === '' || addIsbn === '') {
 	ui.showAlert('Please, fill in all fields', 'error');
 	setTimeout(removeAlert, 2500);
 } else {
 	ui.addBookToList(book);
 	ui.clearFields();
 	ui.showAlert('Book is added', 'success');
 	Store.addBooks(book);
 	setTimeout(removeAlert, 2500);
 }
}

function deleteBook(event) {
	const { target } = event;
	const ui = new UI();
	ui.deleteBookfromList(target);
	Store.removeBook(target.parentElement.previousElementSibling.textContent);
	event.preventDefault();
}



function subscribe() {
	form.addEventListener('submit', addBook);
	list.addEventListener('click', deleteBook);
	document.addEventListener('DOMContentLoaded', Store.displayBooks());
}

function init() {
	findElements();
	subscribe();
}

window.onload = init;