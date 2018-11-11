import React from "react";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";
import PropTypes from "prop-types";
import styled from "styled-components";

const BookWrapper = styled.a`
	background: papayawhip;
	display: grid;
	grid-template-columns: 1fr 300px;
	width: 400px;
	grid-gap: 20px;
	padding: 20px;
	margin: 10px;
	color: black;

	:hover {
		color: black;
		text-decoration: none;
		box-shadow: 0.1em 0.1em 0.1em grey;
	}
`;

const BookCoverImage = styled.img`
	width: 60px;
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
`;

const Title = styled.h1`
	font-size: 1.3em;
`;

const Author = styled.h3`
	font-size: 1em;
`;

function renderBook(props) {
	let { title = "", author = "", url = "", image = "" } = props;
	title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	return (
		<BookWrapper href={url}>
			<BookCoverImage src={image} />
			<TitleAuthorWrapper>
				<Title>{title}</Title>
				<Author>{author}</Author>
			</TitleAuthorWrapper>
		</BookWrapper>
	);
}

function Book(props) {
	return <pre>{renderBook(props)}</pre>;
}

Book.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default Book;
