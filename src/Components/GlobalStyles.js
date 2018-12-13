import { createGlobalStyle } from "styled-components";

export const theme = {
	black: "#2D2A32",
	red: "#AD181A",
	blue: "#30BCED",
	darkblue: "#16566C",
	gray: "#D1D1D1",
	yellow: "#FCC631",
	white: "#FFFFFF",
	bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
	S01: "4px",
	S02: "8px",
	S03: "12px",
	S04: "16px",
	S05: "24px",
	S06: "32px",
	S07: "48px",
	S08: "64px",
	S09: "96px",
	S10: "128px",
	S11: "192px",
	S12: "256px",
	S13: "384px",
	S14: "512px",
	S15: "640px",
	S16: "768px",
	F01: "12px",
	F02: "14px",
	F03: "16px",
	F04: "18px",
	F05: "20px",
	F06: "24px",
	F07: "30px",
	F08: "36px",
	F09: "48px",
	F10: "60px",
	F11: "72px"
};

export const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-family: 'greycliff';
		font-size: ${props => props.theme.F03};
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
`;
