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
`;

export const AddNewList = styled.button`
	font-size: 50px;
	width: 1em;
	height: 1em;
	border-radius: 0.5em;
`;
