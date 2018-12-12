import styled from "styled-components";

export const NewBookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	display: ${props => (props.displayNewBook ? "grid" : "none")};
	grid-template-rows: auto auto;
	grid-gap: 1rem;
	width: 100%;
	padding: 1.5rem;
	h1 {
		justify-self: center;
	}
`;

export const BookWrapper = styled.div`
	display: grid;
	grid-template-columns: 6rem auto;
	width: 100%;
	grid-gap: 1rem;
`;

export const BookCoverImage = styled.img`
	justify-self: center;
	width: 5rem;
`;

export const TitleAuthorWrapper = styled.fieldset`
	align-self: center;
	display: grid;
	grid-gap: 0.5rem;
	border: none;
	input {
		color: ${props => props.theme.black};
		background: ${props => props.theme.yellow};
		border: none;
		outline: none;
	}
`;
