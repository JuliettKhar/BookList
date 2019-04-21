let form;
let title;
let author;
let isbn;
let list;
let container;
let alert;

function findElements() {
	form = document.querySelector('#book-form');
	title = form.querySelector('#title');
	author = form.querySelector('#author');
	isbn = form.querySelector('#isbn');
	list = document.querySelector('#book-list');
	container = document.querySelector('.container');
}

//Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI constructor
function UI() {};
UI.prototype.showAlert = function(message, className) {
		const div = document.createElement('div');
		div.className= `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		container.insertBefore(div, form);
}

UI.prototype.addBookToList = function(book) {
		const row = document.createElement('tr');
			row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="delete">X</a></td>
		`;
		list.appendChild(row);
}

UI.prototype.clearFields = function() {
	title.value = ''; 
	author.value = '';
	isbn.value = '';
}

UI.prototype.deleteBookfromList = function(target) {
	if(target.className === 'delete') target.parentElement.parentElement.remove();
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
 	setTimeout(removeAlert, 2500);
 }
}

function deleteBook(event) {
	const { target } = event;
	const ui = new UI();
	ui.deleteBookfromList(target);
	event.preventDefault();
}



function subscribe() {
	form.addEventListener('submit', addBook);
	list.addEventListener('click', deleteBook);
}

function init() {
	findElements();
	subscribe();
}

window.onload = init;