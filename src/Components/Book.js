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
	border: 0.3rem solid ${props => props.theme.orange};
`;

export const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};
`;

export const Title = styled.h1`
	font-size: ${props => props.theme.F04};
	color: ${props => props.theme.darkorange};
	font-weight: 900;
`;

export const Author = styled.h3`
	font-size: ${props => props.theme.F03};
	color: ${props => props.theme.orange};
	font-weight: 900;
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
