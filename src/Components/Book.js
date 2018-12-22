import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { capitalizeFirstLetterEachWord } from "../HelperFunctions";

Book.propTypes = {
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export const BookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	padding: ${props => props.theme.S05};
`;

export const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S04};
`;

export const Title = styled.h1`
	font-size: ${props => props.theme.F04};
`;

export const Author = styled.h3`
	font-size: ${props => props.theme.F03};
	font-style: italic;
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
		</BookWrapper>
	);
}
