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

export const AddNewList = styled.label`
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-gap: ${props => props.theme.S01};
	color: ${props => props.theme.gray};
	padding-left: ${props => props.theme.S03};
	justify-self: start;
	align-items: center;
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
	:hover {
		color: ${props => props.theme.blue};
	}
`;

export const TabsWrapper = styled.div`
	display: grid;
	grid-template-columns: 10fr 1fr;
	width: 100%;
`;

export const TabDropButton = styled.button`
	color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
	background: white;
	font-size: ${props => props.theme.F07};
	width: ${props => props.theme.S06};
	border: none;
	outline: none;
	justify-items: end;
	:hover {
		color: ${props => props.theme.blue};
	}
`;
