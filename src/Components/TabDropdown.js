import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

TabDropdown.propTypes = {
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired
};

const Wrapper = styled.div``;

const TabDropButton = styled.button`
	font-size: ${props => props.theme.F04};
`;

const Dropdown = styled.div`
	border: 1px solid black;
	position: absolute;
	width: 20px;

	display: grid;
`;

export default function TabDropdown(props) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<Wrapper>
			<TabDropButton>&#9660;</TabDropButton>
			<Dropdown>
				<div>Option 1</div>
				<div>Option 2</div>
			</Dropdown>
		</Wrapper>
	);
}
