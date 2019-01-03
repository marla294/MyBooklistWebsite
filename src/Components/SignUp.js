import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

SignUp.propTypes = {
	addNewUser: PropTypes.func.isRequired,
	signIn: PropTypes.func.isRequired
};

const SignUpWrapper = styled.div`
	justify-self: center;

	width: 100%;
	padding: ${props => props.theme.S04};

	background: ${props => props.theme.yellow};

	display: grid;
	grid-gap: 1em;

	border: 0.3rem solid ${props => props.theme.orange};

	h2 {
		justify-self: center;

		margin-bottom: ${props => props.theme.S03};

		color: ${props => props.theme.darkorange};
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

const SignUpForm = styled.form`
	display: grid;
	grid-template-rows: 1fr;
	grid-gap: ${props => props.theme.S03};
`;

const FormField = styled.label`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: ${props => props.theme.S03};

	text-align: right;
	font-size: ${props => props.theme.F03};
	font-weight: 900;

	color: ${props => props.theme.darkorange};

	input {
		color: ${props => props.theme.darkorange};
		background: ${props => props.theme.yellow};

		font-size: ${props => props.theme.F03};

		border: 1px solid ${props => props.theme.orange};
		outline: none;
	}
`;

const SubmitForm = styled.button`
	margin-top: ${props => props.theme.S04};
	padding: ${props => props.theme.S01};

	color: ${props => props.theme.yellow};
	background-color: ${props => props.theme.darkorange};

	border: none;

	font-size: ${props => props.theme.F04};
	font-weight: 900;
`;

const ErrorField = styled.div`
	justify-self: center;

	display: ${props => (props.displayError ? "grid" : "none")};

	color: red;

	font-size: ${props => props.theme.F03};
	font-weight: 900;
`;

export default function SignUp(props) {
	const [firstname, setFirstname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [displayError, setDisplayError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "firstname") setFirstname(value);
		if (name === "username") setUsername(value);
		if (name === "password") setPassword(value);
		if (name === "confirm") setConfirm(value);
	};

	return (
		<SignUpWrapper>
			<h2>Sign Up For An Account</h2>
			<SignUpForm
				onSubmit={async e => {
					e.preventDefault();
					if (password === confirm) {
						const userId = await props.addNewUser(
							firstname,
							username,
							password
						);

						if (userId) await props.signIn(userId);
						else {
							setDisplayError(true);
							setErrorMessage(
								"Username already exists, please choose another and try again"
							);
						}
					} else {
						setDisplayError(true);
						setErrorMessage(
							"Password and Confirm Password do not match, please try again"
						);
					}
				}}
			>
				<FormField>
					First Name:
					<input
						type="text"
						id="firstname"
						name="firstname"
						required
						value={firstname}
						onChange={handleChange}
					/>
				</FormField>
				<FormField>
					Username:
					<input
						type="text"
						id="username"
						name="username"
						required
						value={username}
						onChange={handleChange}
					/>
				</FormField>
				<FormField>
					Password:
					<input
						type="password"
						id="password"
						name="password"
						required
						value={password}
						onChange={handleChange}
					/>
				</FormField>
				<FormField>
					Confirm Password:
					<input
						type="password"
						id="confirm"
						name="confirm"
						required
						value={confirm}
						onChange={handleChange}
					/>
				</FormField>
				<SubmitForm type="submit">Submit</SubmitForm>
				<ErrorField displayError={displayError}>
					{errorMessage}
				</ErrorField>
			</SignUpForm>
		</SignUpWrapper>
	);
}
