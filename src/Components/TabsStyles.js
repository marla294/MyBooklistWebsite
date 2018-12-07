import styled from "styled-components";

export const TabsWrapper = styled.div`
	display: grid;
`;

export const TabWrapper = styled.div`
	background: ${props => props.theme.yellow};
	width: 150px;
	display: grid;
	align-content: center;
	justify-items: center;
	padding: 1em 1em;
`;

export const Tab = styled.input`
	background: ${props => props.theme.yellow};
	font-size: 1.5em;
	width: 90%;
	text-align: center;
	border: none;
	outline: none;
`;
