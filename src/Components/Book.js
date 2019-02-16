import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { capitalizeFirstLetterEachWord } from "../HelperFunctions";

Book.propTypes = {
	bookId: PropTypes.number.isRequired,
	listId: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	deleteBook: PropTypes.func.isRequired
};

const BookWrapper = styled.div`
	padding: ${props => props.theme.S05};
	background: ${props => props.theme.yellow};
	border: 0.3rem solid ${props => props.theme.orange};
	display: grid;
	grid-template-columns: 10fr 1fr;
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

const Title = styled.h1`
	color: ${props => props.theme.darkorange};
	font-size: ${props => props.theme.F04};
	font-weight: 900;
	display: ${props => (props.edit ? "none" : "default")};
`;

const TitleInput = styled.input`
	border-radius: 0;
	color: ${props => props.theme.darkorange};
	font-size: ${props => props.theme.F04};
	font-weight: 900;
	display: ${props => (props.edit ? "default" : "none")};
`;

const Author = styled.h3`
	color: ${props => props.theme.orange};
	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

const DeleteBook = styled.button`
	height: 19px;
	width: 19px;
	padding: 0;
	margin: 0;
	color: ${props => props.theme.darkorange};
	background-color: ${props => props.theme.yellow};
	border: none;
	outline: none;
	font-size: ${props => props.theme.F08};
	line-height: 0;
	align-self: start;
	justify-self: end;
`;

export default function Book(props) {
	const [title, setTitle] = useState(
		capitalizeFirstLetterEachWord(props.title)
	);
	const [edit, setEdit] = useState(false);
	let { author = "" } = props;
	// title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	const handleChange = e => {
		const { name, value } = e.target;

		// Want to keep the allowed title and author under 120 characters
		const slicedValue = value.slice(0, 120);

		// if (name === "title") setTitle(slicedValue);
		// if (name === "author") setAuthor(slicedValue);

		// setDisplayError(false);
		// setErrorMessage("");
	};

	return (
		<BookWrapper>
			<TitleAuthorWrapper>
				<Title edit={edit} onClick={() => setEdit(true)}>
					{title}
				</Title>
				<TitleInput
					type="text"
					id="title"
					name="title"
					required
					placeholder="Title"
					value={title}
					onChange={handleChange}
					edit={edit}
				/>
				<Author>{author}</Author>
			</TitleAuthorWrapper>
			<DeleteBook
				onClick={() => props.deleteBook(props.bookId, props.listId)}
			>
				&times;
			</DeleteBook>
		</BookWrapper>
	);
}
