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
	width: 140px;

	border: 1px solid black;

	position: absolute;
	right: 10px;

	display: grid;
`;

const Option = styled.div``;

export default function TabDropdown(props) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<Wrapper>
			<TabDropButton>&#9660;</TabDropButton>
			<Dropdown>
				<Option>Option 1</Option>
				<Option>Option 2</Option>
			</Dropdown>
		</Wrapper>
	);
}
