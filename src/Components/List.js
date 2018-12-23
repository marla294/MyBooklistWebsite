import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Book from "./Book";
import NewBook from "./NewBook";
import { ListWrapper, BooksWrapper, AddNewBook } from "./ListStyles";

List.propTypes = {
	id: PropTypes.number.isRequired,
	books: PropTypes.array.isRequired,
	addBook: PropTypes.func.isRequired,
	addBookToList: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired,
	deleteBookFromList: PropTypes.func.isRequired
};

export default function List(props) {
	const [displayNewBook, setDisplayNewBook] = useState(false);
	return (
		<ListWrapper>
			<BooksWrapper>{renderBooks(props)}</BooksWrapper>
			<NewBook
				displayNewBook={displayNewBook}
				addBook={props.addBook}
				addBookToList={props.addBookToList}
				listId={props.id}
			/>
			<AddNewBook key={0} displayNewBook={!displayNewBook}>
				<button onClick={() => setDisplayNewBook(true)}>+</button>
			</AddNewBook>
		</ListWrapper>
	);
}

function renderBooks(props) {
	const books = props.books;

	if (!books) {
		return <h1>Add a book to your list to get started!</h1>;
	}

	return books.map(book => {
		return (
			<Book
				key={book.Id}
				bookId={book.Id}
				listId={props.id}
				title={book.Title}
				author={book.Author}
				url={book.URL}
				image={book.Cover}
				deleteBook={props.deleteBook}
				deleteBookFromList={props.deleteBookFromList}
			/>
		);
	});
}
