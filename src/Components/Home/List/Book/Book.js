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
	grid-template-columns: 6em auto;
	width: 100%;
	grid-gap: 1em;
	padding: 1.5em;

	:hover {
		box-shadow: ${props => props.theme.bs};
	}
`;

const BookCoverImage = styled.img`
	justify-self: center;
	width: 5em;
`;

const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: 0.5em;
`;

const Title = styled.h1`
	font-size: 1.5em;
`;

const Author = styled.h3`
	font-size: 1.2em;
`;
