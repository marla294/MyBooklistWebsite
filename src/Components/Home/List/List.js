import React from "react";
import Book from "./Book/Book";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListWrapper = styled.div`
	font-family: "Montserrat", sans-serif;
	font-size: 15px;
	display: grid;
	grid-gap: 1em;
	width: 30em;
	padding: 1em;
`;

const Title = styled.input`
	box-sizing: border-box;
	width: 100%;
	font-size: 2em;
	text-align: center;
	border: none;
`;

const BooksWrapper = styled.div`
	display: grid;
`;

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
	if (bookList.length === 0) {
		return "Add a book to your list to get started!";
	} else {
		return bookList.map(book => {
			return (
				<Book
					key={book.Id}
					title={book.Book.Title}
					author={book.Book.Author}
					url={book.Book.URL}
					image={
						"https://images-na.ssl-images-amazon.com/images/I/81v5wp2zeQL.jpg"
					}
				/>
			);
		});
	}
}

function List(props) {
	return <pre>{renderList(props)}</pre>;
}

List.propTypes = {
	bookList: PropTypes.array.isRequired,
	listTitle: PropTypes.string.isRequired
};

export default List;
