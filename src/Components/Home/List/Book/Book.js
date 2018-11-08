import React from "react";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";

import PropTypes from "prop-types";

class Book extends React.Component {
	renderBook = () => {
		let book = this.props.book.Book;
		let title = capitalizeFirstLetterEachWord(book.Name) || "";
		let url = book.URL || "";

		return (
			<div className="book">
				<div className="title">{title}</div>
			</div>
		);
	};

	render() {
		return <pre>{this.renderBook()}</pre>;
	}
}

Book.propTypes = {
	book: PropTypes.object.isRequired
};

export default Book;
