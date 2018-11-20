import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import Book from "./Book/Book";
import { ListWrapper, Title, BooksWrapper } from "./ListStyles";

List.propTypes = {
	id: PropTypes.number.isRequired,
	bookList: PropTypes.array.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired
};

export default function List(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<ListWrapper>
			{renderListTitle(props, listTitle, setListTitle)}
			<BooksWrapper>{renderBooks(props)}</BooksWrapper>
		</ListWrapper>
	);
}

function renderListTitle(props, listTitle, setListTitle) {
	return (
		<Title
			value={listTitle}
			onChange={event => {
				setListTitle(event.target.value);
			}}
			onBlur={() => {
				props.updateListTitle(props.id, listTitle);
			}}
		/>
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
				image={book.Cover}
			/>
		);
	});
}
