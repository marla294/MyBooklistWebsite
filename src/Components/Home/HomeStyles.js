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
	grid-template-columns: repeat(2, 1fr);
`;
