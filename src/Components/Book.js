import React from "react";
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
`;

const Title = styled.h1`
	color: ${props => props.theme.darkorange};

	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const Author = styled.h3`
	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

const DeleteBook = styled.button`
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
	let { title = "", author = "" } = props;
	title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	return (
		<BookWrapper>
			<TitleAuthorWrapper>
				<Title>{title}</Title>
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
