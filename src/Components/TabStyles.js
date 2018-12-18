import styled from "styled-components";

export const TabStyles = styled.div`
	width: ${props => props.theme.S11};
	height: 0;

	border-bottom: ${props => props.theme.S06} solid
		${props => props.theme.blue};
	border-right: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);
	border-left: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);

	display: grid;
	grid-template-columns: 15fr 1fr;

	* {
		height: ${props => props.theme.S06};

		color: ${props => props.theme.black};
		background: ${props => props.theme.blue};

		border: none;
		outline: none;
		cursor: pointer;
	}

	input {
		width: 95%;

		font-size: ${props => props.theme.F03};
	}

	button {
		padding: 0 5px 10px 0;

		font-size: ${props => props.theme.F07};
		text-align: center;
		line-height: ${props => props.theme.S05};
	}
`;
