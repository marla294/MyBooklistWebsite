import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

SignIn.propTypes = {
	signIn: PropTypes.func.isRequired,
	getUser: PropTypes.func.isRequired
};

const SignInWrapper = styled.div`
	justify-self: center;

	width: 100%;
	padding: ${props => props.theme.S04};

	background: ${props => props.theme.yellow};

	display: grid;
	grid-gap: 1em;

	border: 0.3rem solid ${props => props.theme.orange};

	h1 {
		justify-self: center;

		margin-bottom: ${props => props.theme.S03};

		color: ${props => props.theme.darkorange};
	}

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

const SignInForm = styled.form`
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

export default function SignIn(props) {
	const [username, setUsername] = useState("Username");
	const [password, setPassword] = useState("");

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "username") setUsername(value);
		if (name === "password") setPassword(value);
	};

	return (
		<SignInWrapper>
			<h1>Sign In</h1>
			<SignInForm
				onSubmit={async e => {
					e.preventDefault();
					const userId = await props.getUser(username, password);

					if (userId !== null) {
						props.signIn(userId);
					}

					//TODO: error handling when user gets username/password wrong
				}}
			>
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
				<SubmitForm type="submit">Submit</SubmitForm>
			</SignInForm>
		</SignInWrapper>
	);
}