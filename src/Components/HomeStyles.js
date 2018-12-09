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
	font-size: 1.7em;
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 0.5em;
	justify-self: center;
	align-items: center;
	padding: 0.88em;
	button {
		font-size: 50px;
		width: 0.75em;
		height: 0.75em;
		border-radius: 0.5em;
		line-height: 0;
		padding-bottom: 0.25em;
		outline: none;
		border-color: ${props => props.theme.black};
		color: ${props => props.theme.black};
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
