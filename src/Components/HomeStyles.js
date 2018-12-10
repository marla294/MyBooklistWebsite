import styled from "styled-components";

export const HomeWrapper = styled.div`
	display: grid;
	grid-template-rows: 10em 1fr;
`;

export const Header = styled.h1`
	display: grid;
	font-size: 3.5em;
	align-items: center;
	justify-items: center;
`;

export const Lists = styled.div`
	display: grid;
	grid-gap: 1em;
	width: 45em;
`;

export const AddNewList = styled.label`
	display: grid;
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

export const ListWrapper = styled.div`
	display: grid;
	grid-gap: 1em;
	width: 45em;
	padding: 1.5em;
	justify-items: center;
`;

export const TabsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 14.5em);
	width: 100%;
	height: 3em;
	padding: 1.5em;
	justify-items: start;
`;
