import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { GlobalStyle } from "./GlobalStyles";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

SignInPage.propTypes = {
	getToken: PropTypes.func.isRequired,
	addNewUser: PropTypes.func.isRequired,
	signIn: PropTypes.func.isRequired,
	validateUser: PropTypes.func.isRequired
};

const PageWrapper = styled.div`
	display: grid;
	grid-template-rows: 8rem 1fr;
	grid-gap: ${props => props.theme.S05};
`;

const Header = styled.h1`
	display: grid;
	align-items: center;
	justify-items: center;

	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F09};
`;

export default function SignInPage(props) {
	if (!props.getToken()) {
		return (
			<PageWrapper>
				<Header>My BookList</Header>
				<SignIn
					validateUser={props.validateUser}
					signIn={props.signIn}
				/>
				<SignUp addNewUser={props.addNewUser} signIn={props.signIn} />
				<GlobalStyle />
			</PageWrapper>
		);
	} else return <div>{props.children}</div>;
}
