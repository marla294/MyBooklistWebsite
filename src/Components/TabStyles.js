import styled from "styled-components";

export const TabStyles = styled.div`
	grid-column: ${props => props.count} / ${props => props.count + 2}
	width: 15em;
	height: 0em;
	display: grid;
	grid-template-columns: ${props =>
		props.type === "NewList" ? "1fr" : "1fr 15fr"}
	justify-items: center;
	border-bottom: 3em solid ${props => {
		return props.selected ? props.theme.blue : props.theme.darkblue;
	}}
	z-index: ${props => (props.selected ? 10 : 2)};
	border-right: 1em solid rgba(255, 0, 0, 0);
	border-left: 1em solid rgba(255, 0, 0, 0);

	input {
		color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
		background: ${props => {
			return props.selected ? props.theme.blue : props.theme.darkblue;
		}}
		font-size: 15px;
		width: 95%;
		text-align: left;
		border: none;
		outline: none;
		transform: translate(0em, 0.35em);
	}
	div {
		cursor: pointer;
		color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
		background: ${props =>
			props.selected ? props.theme.blue : props.theme.darkblue};
		font-size: 15px;
		width: 95%;
		text-align: left;
		border: none;
		outline: none;
		transform: translate(0em, 0.35em);
		justify-items: center;
	}
	button {
		color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
		align-self: center;
		justify-self: center;
		font-size: 20px;
		width: 0.5em;
		height: 0.5em;
		padding: 0;
		padding-bottom: 0.25em;
		line-height: 0;
		outline: none;
		border: none;
		background: ${props =>
			props.selected ? props.theme.blue : props.theme.darkblue};
	}
`;
