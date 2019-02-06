import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "./Modal";

EditUserInfo.propTypes = {
	show: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	updateFirstName: PropTypes.func.isRequired,
	getUserTokenFromCookie: PropTypes.func.isRequired,
	fetchGetUserByUserToken: PropTypes.func.isRequired,
	setFirstNameByUserToken: PropTypes.func.isRequired
};

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
	h3 {
		color: ${props => props.theme.orange};
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

const ErrorField = styled.div`
	justify-self: center;
	display: ${props => (props.displayError ? "grid" : "none")};
	color: red;
	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

export default function EditUserInfo(props) {
	const { show, close } = props;
	const [user, setUser] = useState(null);
	const [displayError, setDisplayError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(async () => {
		// If the user on the cookie is valid, checkUserFn will send back a token from the db
		const userToken = props.getUserTokenFromCookie();

		if (userToken) {
			const usr = await props.fetchGetUserByUserToken(userToken);
			setUser(usr);
		}
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;

		// Want to keep the name field under 40 characters
		const slicedValue = value.slice(0, 40).trim();

		if (name === "firstName") setUser({ ...user, Name: slicedValue });

		setDisplayError(false);
		setErrorMessage("");
	};

	return (
		<Modal show={show} close={close}>
			<form
				onSubmit={async e => {
					e.preventDefault();
					const firstnameAllowedRegEx = /^[a-zA-Z]*$/g;
					if (user.Name.length < 1 || user.Name.length > 40) {
						setDisplayError(true);
						setErrorMessage(
							"First name must be between 1 and 40 characters"
						);
						return;
					} else if (!firstnameAllowedRegEx.test(user.Name)) {
						setDisplayError(true);
						setErrorMessage(
							"Only alphabetical characters allowed in first name"
						);
						return;
					} else {
						await props.updateFirstName(user.Name);
						await props.setFirstNameByUserToken();
						close();
					}
				}}
			>
				<UserInfoWrapper>
					<h3>Update Your Account</h3>
					<UserFirstName
						type="text"
						id="firstName"
						name="firstName"
						placeholder="First Name"
						required
						value={user === null ? "" : user.Name}
						onChange={handleChange}
					/>
					<SubmitForm>Submit</SubmitForm>
					<ErrorField displayError={displayError}>
						{errorMessage}
					</ErrorField>
				</UserInfoWrapper>
			</form>
		</Modal>
	);
}
