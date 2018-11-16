import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { capitalizeFirstLetterEachWord } from "../../../../HelperFunctions";

Book.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default function Book(props) {
	return renderBook(props);
}

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

const BookWrapper = styled.a`
	background: papayawhip;
	display: grid;
	grid-template-columns: 4em auto;
	width: 100%;
	grid-gap: 1em;
	padding: 1em;

	:hover {
		box-shadow: 0.1em 0.1em 0.1em grey;
	}
`;

const BookCoverImage = styled.img`
	justify-self: center;
	width: 4em;
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: 0.5em;
`;

const Title = styled.h1`
	font-size: 1.3em;
`;

const Author = styled.h3`
	font-size: 1em;
`;
