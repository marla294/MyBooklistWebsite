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

const AddNewBookLabel = styled.label`
	height: 2rem;
	width: 150px;

	color: ${props => props.theme.gray};

	display: flex;
	align-items: center;

	button {
		width: 2rem;
		height: 2rem;

		padding: 0;
		padding-bottom: 0.7rem;
		margin-right: ${props => props.theme.S01};

		font-size: 3rem;
		line-height: 0;

		background: none;
		color: ${props => props.theme.gray};

		border: none;
		outline: none;

		-webkit-appearance: none;
	}

	:hover {
		button {
			color: ${props => props.theme.orange};
		}
		color: ${props => props.theme.orange};
	}
`;

const AddBookHeader = styled.h2`
	color: ${props => props.theme.orange};
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
			<AddNewBookLabel>
				<button onClick={() => setDisplayNewBook(true)}>+</button>
				Add New Book
			</AddNewBookLabel>
		</ListWrapper>
	);
}

function renderBooks(props) {
	let books = props.books;

	if (!books || books.length === 0) {
		return <AddBookHeader>Add a book to get started!</AddBookHeader>;
	}

	// Sorts books from oldest to newest, so new books show up on the bottom of the list
	books = books.sort((a, b) => a.Id - b.Id);

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
