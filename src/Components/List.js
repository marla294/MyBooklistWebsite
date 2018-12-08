import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import { ListWrapper, BooksWrapper } from "./ListStyles";

List.propTypes = {
	id: PropTypes.number.isRequired,
	bookList: PropTypes.array.isRequired
};

export default function List(props) {
	return (
		<ListWrapper>
			<BooksWrapper>{renderBooks(props)}</BooksWrapper>
		</ListWrapper>
	);
}

function renderBooks(props) {
	let bookList = props.bookList;

	if (!bookList) {
		return "List not found";
	}

	if (bookList.length === 0) {
		return "Add a book to your list to get started!";
	}

	return bookList.map(book => {
		return (
			<Book
				key={book.Id}
				title={book.Title}
				author={book.Author}
				url={book.URL}
				image={book.Cover}
			/>
		);
	});
}
