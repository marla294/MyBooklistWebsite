import styled from "styled-components";

export const BookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	display: ${props => (props.display ? "grid" : "none")};
	grid-template-columns: 6em auto;
	width: 100%;
	grid-gap: 1em;
	padding: 1.5em;

	:hover {
		box-shadow: ${props => props.theme.bs};
	}
`;

export const BookCoverImage = styled.img`
	justify-self: center;
	width: 5em;
`;

export const TitleAuthorWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: 0.5em;
`;

export const Title = styled.h1`
	font-size: 1.5em;
	font-weight: normal;
`;

export const Author = styled.h3`
	font-size: 1.2em;
	font-weight: normal;
	font-style: italic;
`;
