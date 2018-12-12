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

export const AddNewBook = styled.label`
	display: ${props => (props.display ? "grid" : "none")};
	grid-template-columns: auto;
	justify-self: start;
	align-items: center;
	padding-left: 1rem;
	button {
		padding: 0;
		padding-bottom: 0.7rem;
		font-size: 3rem;
		width: 2rem;
		height: 2rem;
		border-radius: 5rem;
		line-height: 0;
		outline: none;
		border-color: ${props => props.theme.gray};
		color: ${props => props.theme.gray};
		:hover {
			border-color: ${props => props.theme.blue};
			color: ${props => props.theme.blue};
		}
	}
`;
