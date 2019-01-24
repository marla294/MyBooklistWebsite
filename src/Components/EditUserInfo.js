import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "./Modal";

Modal.propTypes = {
	show: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired
};

export default function EditUserInfo(props) {
	const { show, close } = props;

	return <Modal show={show} close={close} />;
}
