import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	children: PropTypes.node
};

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
	padding: 50px;
`;

const ModalStyles = styled.div`
	padding: ${props => props.theme.S05};
	background: ${props => props.theme.yellow};
	border: 0.3rem solid ${props => props.theme.orange};
	display: grid;
	grid-template-columns: 5fr 1fr;
`;

const CloseForm = styled.button`
	-webkit-appearance: none;
	height: 19px;
	width: 19px;
	padding: 0;
	margin: 0;
	color: ${props => props.theme.darkorange};
	background-color: ${props => props.theme.yellow};
	border: none;
	outline: none;
	font-size: ${props => props.theme.F08};
	line-height: 0;
	align-self: start;
	justify-self: end;
`;

export default function Modal(props) {
	if (!props.show) {
		return null;
	}

	return (
		<Backdrop>
			<ModalStyles>
				{props.children}
				<CloseForm onClick={props.close}>&times;</CloseForm>
			</ModalStyles>
		</Backdrop>
	);
}
