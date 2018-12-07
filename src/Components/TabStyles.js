import styled from "styled-components";

export const TabStyles = styled.div`
	width: 15em;
	height: 0em;
	display: grid;
	justify-items: center;
	border-bottom: 3em solid ${props => props.theme.blue};
	border-right: 1em solid ${props => props.theme.white};
	border-left: 1em solid ${props => props.theme.white};
	input {
		background: ${props => props.theme.blue};
		font-size: 15px;
		width: 90%;
		text-align: center;
		border: none;
		outline: none;
		transform: translate(0em, 0.35em);
	}
`;
