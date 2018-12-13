import styled from "styled-components";

export const NewBookWrapper = styled.div`
	background: ${props => props.theme.yellow};
	display: ${props => (props.displayNewBook ? "grid" : "none")};
	grid-template-rows: auto auto;
	grid-gap: ${props => props.theme.S04};
	width: 100%;
	padding: ${props => props.theme.S04};
	h1 {
		justify-self: center;
	}
`;

export const BookWrapper = styled.div`
	display: grid;
	grid-template-columns: 6rem auto;
	width: 100%;
	grid-gap: ${props => props.theme.S04};
`;

export const BookCoverImage = styled.img`
	justify-self: center;
	width: 5rem;
`;

export const TitleAuthorWrapper = styled.fieldset`
	align-self: center;
	border: none;
	display: grid;
	grid-template-rows: repeat(3, auto);
	input {
		color: ${props => props.theme.black};
		background: ${props => props.theme.yellow};
		border: none;
		outline: none;
		font-size: 2rem;
	}
	label {
		font-size: 2rem;
	}
`;
