import React from "react";
import Book from "./Book/Book";
import PropTypes from "prop-types";

class List extends React.Component {
	renderBooks = () => {
		let bookList = this.props.bookList;
		if (bookList.length === 0) {
			return "Loading...";
		} else {
			return bookList.map(book => {
				return <Book key={book.Id} book={book} />;
			});
		}
	};

	render() {
		return <pre className="list">{this.renderBooks()}</pre>;
	}
}

List.propTypes = {
	bookList: PropTypes.array.isRequired
};

export default List;
