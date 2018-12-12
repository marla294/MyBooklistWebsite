import React from "react";
import PropTypes from "prop-types";
import { capitalizeFirstLetterEachWord } from "../HelperFunctions";
import {
	BookWrapper,
	BookCoverImage,
	TitleAuthorWrapper,
	Title,
	Author
} from "./BookStyles";

Book.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default function Book(props) {
	let { title = "", author = "", url = "", image = "" } = props;
	title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	return (
		<BookWrapper href={url}>
			<BookCoverImage src={image} />
			<TitleAuthorWrapper>
				<Title>{title}</Title>
				<Author>{author}</Author>
			</TitleAuthorWrapper>
		</BookWrapper>
	);
}
