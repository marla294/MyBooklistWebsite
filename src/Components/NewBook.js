import React, { useState } from "react";
import styled from "styled-components";

// export const NewBookWrapper = styled.div`
// 	background: ${props => props.theme.yellow};
// 	display: ${props => (props.displayNewBook ? "grid" : "none")};
// 	grid-template-rows: auto auto;
// 	grid-gap: ${props => props.theme.S04};
// 	width: 100%;
// 	padding: ${props => props.theme.S04};
// 	h1 {
// 		justify-self: center;
// 	}
// `;

// export const BookWrapper = styled.div`
// 	display: grid;
// 	grid-template-columns: 6rem auto;
// 	width: 100%;
// 	grid-gap: ${props => props.theme.S04};
// `;

// export const BookCoverImage = styled.img`
// 	justify-self: center;
// 	width: 5rem;
// `;

// export const TitleAuthorWrapper = styled.fieldset`
// 	align-self: center;
// 	border: none;
// 	display: grid;
// 	grid-template-rows: repeat(3, auto);
// 	input {
// 		color: ${props => props.theme.black};
// 		background: ${props => props.theme.yellow};
// 		border: none;
// 		outline: none;
// 		font-size: 2rem;
// 	}
// 	label {
// 		font-size: 2rem;
// 	}
// `;

export const BookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	padding: ${props => props.theme.S05};
	border: 0.3rem solid ${props => props.theme.orange};
	display: ${props => (props.displayNewBook ? "grid" : "none")};
`;

export const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};
`;

export const Title = styled.h1`
	font-size: ${props => props.theme.F04};
	color: ${props => props.theme.darkorange};
	font-weight: 900;
`;

export const Author = styled.h3`
	font-size: ${props => props.theme.F03};
	color: ${props => props.theme.orange};
	font-weight: 900;
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
					<button type="submit">Submit</button>
				</TitleAuthorWrapper>
			</form>
		</BookWrapper>
	);
}
