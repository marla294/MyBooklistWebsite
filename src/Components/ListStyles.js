import styled from "styled-components";

export const ListWrapper = styled.div`
	display: grid;
	grid-gap: 1em;
	width: 100%;
	padding: 1.5em;
	border: 0.3rem solid ${props => props.theme.blue};
`;

export const BooksWrapper = styled.div`
	padding-top: 1em;
	display: grid;
	grid-gap: 1em;
`;
