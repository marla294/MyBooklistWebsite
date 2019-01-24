import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

Modal.propTypes = {
	show: PropTypes.bool.isRequired
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
	background: white;
`;

export default function Modal(props) {
	if (!props.show) {
		return null;
	}

	return (
		<Backdrop>
			<ModalStyles>
				<div>Content</div>
				<button>Close</button>
			</ModalStyles>
		</Backdrop>
	);
}
