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
	padding: ${props => props.theme.S05};

	background: ${props => props.theme.yellow};

	border: 0.3rem solid ${props => props.theme.orange};

	display: ${props => (props.displayNewBook ? "grid" : "none")};
	grid-template-columns: 5fr 1fr;
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};

	input {
		background: ${props => props.theme.yellow};

		border: 1px solid ${props => props.theme.orange};
		outline: none;
	}
`;

const Title = styled.input`
	color: ${props => props.theme.darkorange};

	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const Author = styled.input`
	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

const SubmitForm = styled.button`
	color: ${props => props.theme.yellow};
	background-color: ${props => props.theme.darkorange};

	border: none;

	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const CloseForm = styled.button`
	color: ${props => props.theme.darkorange};
	background-color: ${props => props.theme.yellow};

	border: none;
	outline: none;

	font-size: ${props => props.theme.F08};
	line-height: 0;

	align-self: start;
	justify-self: end;
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
					<Title
						type="text"
						id="title"
						name="title"
						required
						value={title}
						onChange={handleChange}
					/>
					<Author
						type="text"
						id="author"
						name="author"
						required
						value={author}
						onChange={handleChange}
					/>
					<SubmitForm type="submit">Submit</SubmitForm>
				</TitleAuthorWrapper>
			</form>
			<CloseForm onClick={() => props.setDisplayNewBook(false)}>
				&times;
			</CloseForm>
		</BookWrapper>
	);
}
