import React from "react";
// import PropTypes from "prop-types";
import {
	NewBookWrapper,
	BookWrapper,
	BookCoverImage,
	TitleAuthorWrapper
} from "./NewBookStyles";

export default function NewBook(props) {
	return (
		<NewBookWrapper display={props.display}>
			<h1>Add a new book!</h1>
			<BookWrapper>
				<BookCoverImage
					src={
						"https://www.freeclipartnow.com/d/11081-1/open-book-01.jpg"
					}
				/>
				<TitleAuthorWrapper>
					<label>
						Title: <input />
					</label>
					<label>
						Author: <input />
					</label>
					<button type="submit">Submit</button>
				</TitleAuthorWrapper>
			</BookWrapper>
		</NewBookWrapper>
	);
}
