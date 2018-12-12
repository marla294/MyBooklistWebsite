import React from "react";
// import PropTypes from "prop-types";
import { useState } from "react";
import {
	NewBookWrapper,
	BookWrapper,
	BookCoverImage,
	TitleAuthorWrapper
} from "./NewBookStyles";

export default function NewBook(props) {
	const [title, setTitle] = useState("New Title");
	const [author, setAuthor] = useState("Author");

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "title") setTitle(value);
		if (name === "author") setAuthor(value);
	};

	return (
		<NewBookWrapper displayNewBook={props.displayNewBook}>
			<h1>Add a new book!</h1>
			<BookWrapper>
				<BookCoverImage
					src={
						"https://www.freeclipartnow.com/d/11081-1/open-book-01.jpg"
					}
				/>
				<form
					onSubmit={async e => {
						e.preventDefault();
						await props.addBook(title, author);
					}}
				>
					<TitleAuthorWrapper>
						<label htmlFor="title">
							Title:
							<input
								type="text"
								id="title"
								name="title"
								placeholder="Title"
								required
								value={title}
								onChange={handleChange}
							/>
						</label>
						<label htmlFor="author">
							Author:
							<input
								type="text"
								id="author"
								name="author"
								placeholder="Author"
								required
								value={author}
								onChange={handleChange}
							/>
						</label>
						<button type="submit">Submit</button>
					</TitleAuthorWrapper>
				</form>
			</BookWrapper>
		</NewBookWrapper>
	);
}
