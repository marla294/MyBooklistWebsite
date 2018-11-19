import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import Book from "./Book/Book";

List.propTypes = {
	bookList: PropTypes.array.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired
};

export default function List(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<React.Fragment>
			{renderList(props, listTitle, setListTitle)}
		</React.Fragment>
	);
}

function renderList(props, listTitle, setListTitle) {
	return (
		<ListWrapper>
			<Title
				type="text"
				value={listTitle}
				onChange={event => {
					setListTitle(event.target.value);
				}}
				onBlur={() => {
					props.updateListTitle(listTitle);
				}}
			/>
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
	width: 45em;
	padding: 1.5em;
`;

const Title = styled.input`
	width: 100%;
	font-size: 2em;
	text-align: center;
	border: none;
`;

const BooksWrapper = styled.div`
	display: grid;
`;
