import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

NewBook.propTypes = {
	displayNewBook: PropTypes.bool.isRequired,
	setDisplayNewBook: PropTypes.func.isRequired,
	addBook: PropTypes.func.isRequired,
	addBookToList: PropTypes.func.isRequired,
	listId: PropTypes.number.isRequired
};

const BookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	padding: ${props => props.theme.S05};
	border: 0.3rem solid ${props => props.theme.orange};
	display: ${props => (props.displayNewBook ? "grid" : "none")};
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};

	input {
		border: none;
		outline: none;
	}
`;

const ButtonWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 20px;
`;

export default function NewBook(props) {
	const [title, setTitle] = useState("New Title");
	const [author, setAuthor] = useState("Author");

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "title") setTitle(value);
		if (name === "author") setAuthor(value);
	};

	return (
		<BookWrapper displayNewBook={props.displayNewBook}>
			<form
				onSubmit={async e => {
					e.preventDefault();
					const bookId = await props.addBook(title, author);
					await props.addBookToList(bookId, props.listId);
				}}
			>
				<TitleAuthorWrapper>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						required
						value={title}
						onChange={handleChange}
					/>
					<input
						type="text"
						id="author"
						name="author"
						placeholder="Author"
						required
						value={author}
						onChange={handleChange}
					/>
					<ButtonWrapper>
						<button type="submit">Submit</button>
						<button
							type="reset"
							onClick={() => props.setDisplayNewBook(false)}
						>
							Cancel
						</button>
					</ButtonWrapper>
				</TitleAuthorWrapper>
			</form>
		</BookWrapper>
	);
}
