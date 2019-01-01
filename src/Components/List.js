import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Book from "./Book";
import NewBook from "./NewBook";

List.propTypes = {
	id: PropTypes.number.isRequired,
	books: PropTypes.array.isRequired,
	createNewBook: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired
};

export const ListWrapper = styled.div`
	justify-self: center;

	width: 100%;
	padding: ${props => props.theme.S04};

	display: grid;
	grid-gap: 1em;

	border: 0.3rem solid ${props => props.theme.orange};

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

const BooksWrapper = styled.div`
	padding-top: 1em;

	display: grid;
	grid-gap: 1em;
`;

const AddNewBook = styled.button`
	width: 2rem;
	height: 2rem;

	padding: 0;
	padding-bottom: 0.7rem;

	font-size: 3rem;
	line-height: 0;

	color: ${props => props.theme.gray};

	border-radius: 5rem;
	border-color: ${props => props.theme.gray};
	outline: none;

	:hover {
		border-color: ${props => props.theme.orange};
		color: ${props => props.theme.orange};
	}
`;

export default function List(props) {
	const [displayNewBook, setDisplayNewBook] = useState(false);
	return (
		<ListWrapper>
			<BooksWrapper>{renderBooks(props)}</BooksWrapper>
			<NewBook
				displayNewBook={displayNewBook}
				setDisplayNewBook={setDisplayNewBook}
				createNewBook={props.createNewBook}
				listId={props.id}
			/>
			<AddNewBook onClick={() => setDisplayNewBook(true)}>+</AddNewBook>
		</ListWrapper>
	);
}

function renderBooks(props) {
	const books = props.books;

	if (!books) {
		return <h1>Add a book to your list to get started!</h1>;
	}

	return books.map(book => {
		return (
			<Book
				key={book.Id}
				bookId={book.Id}
				listId={props.id}
				title={book.Title}
				author={book.Author}
				url={book.URL}
				image={book.Cover}
				deleteBook={props.deleteBook}
			/>
		);
	});
}
