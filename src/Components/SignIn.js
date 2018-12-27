import React, { useState } from "react";
import styled from "styled-components";

const SignInWrapper = styled.div`
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
			<p>Sign in component</p>
			<form>
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
				<button type="submit">Submit</button>
			</form>
		</SignInWrapper>
	);
}
