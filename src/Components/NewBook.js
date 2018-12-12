import React from "react";
// import PropTypes from "prop-types";
import {
	BookWrapper,
	BookCoverImage,
	TitleAuthorWrapper,
	Title,
	Author
} from "./NewBookStyles";

export default function NewBook(props) {
	// let { title = "", author = "", url = "", image = "" } = props;
	// title = capitalizeFirstLetterEachWord(title);
	// author = capitalizeFirstLetterEachWord(author);
	// return (
	// 	<BookWrapper href={url}>
	// 		<BookCoverImage src={image} />
	// 		<TitleAuthorWrapper>
	// 			<Title>{title}</Title>
	// 			<Author>{author}</Author>
	// 		</TitleAuthorWrapper>
	// 	</BookWrapper>
	// );

	return (
		<BookWrapper display={props.display}>
			<p>This will be the new book form!</p>
		</BookWrapper>
	);
}
