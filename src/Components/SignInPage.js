import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const PageWrapper = styled.div`
	display: grid;
	grid-template-rows: 8rem 1fr;
	grid-gap: ${props => props.theme.S03};
`;

const Header = styled.h1`
	display: grid;
	align-items: center;
	justify-items: center;

	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F08};
`;

export default function SignInPage(props) {
	if (!props.getToken()) {
		return (
			<PageWrapper>
				<Header>Sign In or Sign Up!</Header>
				<SignUp />
				<SignIn />
				<GlobalStyle />
			</PageWrapper>
		);
	} else return <div>{props.children}</div>;
}
