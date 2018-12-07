import styled from "styled-components";

export const ListWrapper = styled.div`
	display: grid;
	grid-gap: 1em;
	width: 45em;
	padding: 1.5em;
`;

export const BooksWrapper = styled.div`
	display: grid;
	grid-gap: 1em;
`;

export const TitleWrapper = styled.div`
	display: grid;
	grid-template-columns: auto 2.4em;
`;

export const Title = styled.input`
	width: 100%;
	font-size: 2em;
	text-align: center;
	border: none;
`;

export const DeleteButton = styled.button`
	align-self: center;
	font-size: 20px;
	width: 0.75em;
	height: 0.75em;
	padding: 0;
	padding-bottom: 0.25em;
	border-radius: 0.5em;
	line-height: 0;
	outline: none;
	border-color: ${props => props.theme.black};
	color: ${props => props.theme.black};
`;
