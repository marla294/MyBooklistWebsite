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
					title={book.Book.Title}
					author={book.Book.Author}
					url={book.Book.URL}
					image={
						"https://images-na.ssl-images-amazon.com/images/I/81v5wp2zeQL.jpg"
					}
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
