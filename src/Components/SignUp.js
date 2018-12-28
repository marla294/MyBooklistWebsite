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

	display: grid;
	grid-gap: 1em;

	border: 0.3rem solid ${props => props.theme.orange};

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

export default function SignUp(props) {
	const [firstname, setFirstname] = useState("First Name");
	const [username, setUsername] = useState("Username");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const handleChange = e => {
		const { name, value } = e.target;

		if (name === "firstname") setFirstname(value);
		if (name === "username") setUsername(value);
		if (name === "password") setPassword(value);
		if (name === "confirm") setConfirm(value);
	};

	return (
		<SignUpWrapper>
			<p>Sign up component</p>
			<form
				onSubmit={async e => {
					e.preventDefault();
					if (password === confirm) {
						let id = await props.addNewUser(
							firstname,
							username,
							password
						);
						props.signIn(id);
					}
				}}
			>
				<input
					type="text"
					id="firstname"
					name="firstname"
					required
					value={firstname}
					onChange={handleChange}
				/>
				<input
					type="text"
					id="username"
					name="username"
					required
					value={username}
					onChange={handleChange}
				/>
				<input
					type="password"
					id="password"
					name="password"
					required
					value={password}
					onChange={handleChange}
				/>
				<input
					type="password"
					id="confirm"
					name="confirm"
					required
					value={confirm}
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</SignUpWrapper>
	);
}
