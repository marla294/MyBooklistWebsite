import { createGlobalStyle } from "styled-components";

export const theme = {
	black: "#2D2A32",
	red: "#AD181A",
	blue: "#30BCED",
	gray: "#D1D1D1",
	yellow: "#FCC631",
	white: "#FFFFFF",
	bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-family: 'greycliff';
		font-size: 10px;
		color: ${props => props.theme.black};
		padding: 0;
		margin: 0;
	}
	body {
		font-family: 'greycliff';
		font-size: 1em;
	}
	*, *:before, *:after {
		box-sizing: inherit;
		font-family: 'greycliff';
	}
	h1, h2, h3, h4, h5, h6, p {
		padding: 0;
		margin: 0;
	}
	a {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
	a:hover {
		color: black;
		text-decoration: none;
	}
	input {
		color: ${props => props.theme.black};
	}
`;
