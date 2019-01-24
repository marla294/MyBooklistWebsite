import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "./Modal";

EditUserInfo.propTypes = {
	show: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	updateFirstName: PropTypes.func.isRequired
};

const EditUserWrapper = styled.div`
	padding: ${props => props.theme.S05};
	background: ${props => props.theme.yellow};
	border: 0.3rem solid ${props => props.theme.orange};
	display: grid;
	grid-template-columns: 5fr 1fr;
`;

const UserInfoWrapper = styled.div`
	align-self: center;
	display: grid;
	grid-gap: ${props => props.theme.S02};
	input {
		background: ${props => props.theme.yellow};

		border: 1px solid ${props => props.theme.orange};
		outline: none;
	}
	input::placeholder {
		color: ${props => props.theme.orange};
		font-style: italic;
	}
	@media only screen and (max-width: 400px) {
		max-width: 220px;
	}
`;

const UserFirstName = styled.input`
	border-radius: 0;
	color: ${props => props.theme.darkorange};
	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const SubmitForm = styled.button`
	color: ${props => props.theme.yellow};
	background-color: ${props => props.theme.darkorange};
	border: 4px solid ${props => props.theme.darkorange};
	font-size: ${props => props.theme.F04};
	font-weight: 900;
	-webkit-transition: color 0.2s; /* Safari */
	transition: color 0.2s;
	-webkit-transition: background-color 0.2s; /* Safari */
	transition: background-color 0.2s;
	:hover {
		color: ${props => props.theme.darkorange};
		background-color: ${props => props.theme.yellow};
	}
`;

export default function EditUserInfo(props) {
	const { show, close } = props;

	return (
		<Modal show={show} close={close}>
			<EditUserWrapper>
				<form>
					<UserInfoWrapper>
						<UserFirstName />
						<SubmitForm>Submit</SubmitForm>
					</UserInfoWrapper>
				</form>
			</EditUserWrapper>
		</Modal>
	);
}
