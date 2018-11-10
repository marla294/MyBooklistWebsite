import React from "react";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";
import PropTypes from "prop-types";
import styled from "styled-components";

const BookWrapper = styled.div`
	background: papayawhip;
	display: grid;
	grid-template-columns: 1fr 500px;
	width: 500px;
	grid-gap: 5px;
	border-radius: 2em;
	padding: 10px;
	margin: 10px;
`;

const Title = styled.h1`
	font-size: 1.5em;
`;

const Author = styled.h3`
	font-size: 1em;
`;

const BookCoverImage = styled.img`
	width: 100px;
`;

function renderBook(props) {
	let { title = "", author = "", url = "", image = "" } = props;
	title = capitalizeFirstLetterEachWord(title);
	author = capitalizeFirstLetterEachWord(author);

	return (
		<BookWrapper>
			<BookCoverImage src={image} />
			<div>
				<Title>{title}</Title>
				<Author>{author}</Author>
			</div>
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
