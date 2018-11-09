import React from "react";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";
import PropTypes from "prop-types";

function renderBook(props) {
	let book = props.book.Book;
	let title = capitalizeFirstLetterEachWord(book.Name) || "";

	return (
		<div className="book">
			<div className="title">{title}</div>
		</div>
	);
}

function Book(props) {
	return <pre>{renderBook(props)}</pre>;
}

Book.propTypes = {
	book: PropTypes.object.isRequired
};

export default Book;
