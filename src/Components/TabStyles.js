import styled from "styled-components";

export const TabStyles = styled.div`
	grid-column: ${props => props.count};
	display: grid;
	grid-template-columns: ${props =>
		props.type === "NewList" ? "1fr" : "15fr 1fr"};
	border-bottom: ${props => props.theme.S07} solid ${props => {
	return props.selected ? props.theme.blue : props.theme.darkblue;
}}
	border-right: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);
	border-left: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);
	font-size: ${props => props.theme.F06};
	width: ${props => props.theme.S12};
	height: 0em;
	padding-left: ${props => props.theme.S01};
	z-index: ${props => (props.selected ? 10 : 2)};

	input {
		color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
		background: ${props => {
			return props.selected ? props.theme.blue : props.theme.darkblue;
		}}
		font-size: ${props => props.theme.F06};
		width: 95%;
		text-align: left;
		border: none;
		outline: none;
		cursor: pointer;
	}

	button {
		color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
		background: ${props =>
			props.selected ? props.theme.blue : props.theme.darkblue};
		font-size: ${props => props.theme.F08};
		border: none;
		outline: none;
	}

`;
