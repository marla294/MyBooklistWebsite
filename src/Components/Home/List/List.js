import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Book from "./Book/Book";

List.propTypes = {
	bookList: PropTypes.array.isRequired,
	listTitle: PropTypes.string.isRequired
};

export default function List(props) {
	return <pre>{renderList(props)}</pre>;
}

function renderList(props) {
	return (
		<ListWrapper>
			<Title type="text" defaultValue={props.listTitle} />
			<BooksWrapper>{renderBooks(props)}</BooksWrapper>
		</ListWrapper>
	);
}

function renderBooks(props) {
	let bookList = props.bookList;

	if (!bookList) {
		return "List not found";
	}

	if (bookList.length === 0) {
		return "Add a book to your list to get started!";
	}

	return bookList.map(book => {
		return (
			<Book
				key={book.Id}
				title={book.Title}
				author={book.Author}
				url={book.URL}
				image={
					"https://images-na.ssl-images-amazon.com/images/I/81v5wp2zeQL.jpg"
				}
			/>
		);
	});
}

const ListWrapper = styled.div`
	display: grid;
	grid-gap: 1em;
	width: 30em;
	padding: 1em;
`;

const Title = styled.input`
	width: 100%;
	font-size: 1.5em;
	text-align: center;
	border: none;
`;

const BooksWrapper = styled.div`
	display: grid;
`;
