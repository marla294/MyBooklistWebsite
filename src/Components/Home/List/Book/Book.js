import React from "react";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";
import PropTypes from "prop-types";

function renderBook(props) {
	let { title = "", author = "", url = "", image = "" } = props;
	title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	return (
		<div className="book">
			<div className="title">{title}</div>
			<div className="author">{author}</div>
			<a href={url} className="url">
				Amazon Link
			</a>
			<img src={image} />
		</div>
	);
}

function Book(props) {
	return <pre>{renderBook(props)}</pre>;
}

Book.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default Book;
