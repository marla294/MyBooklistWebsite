import React from "react";
import Book from "./Book/Book";
import PropTypes from "prop-types";

function renderBooks(props) {
	let bookList = props.bookList;
	if (bookList.length === 0) {
		return "Loading...";
	} else {
		return bookList.map(book => {
			return (
				<Book
					key={book.Id}
					title={book.Book.Name}
					author={book.Book.Author}
					url={book.Book.URL}
					image={"image link goes here"}
				/>
			);
		});
	}
}

function List(props) {
	return <pre className="list">{renderBooks(props)}</pre>;
}

List.propTypes = {
	bookList: PropTypes.array.isRequired
};

export default List;
