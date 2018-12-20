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
	position: absolute;
	right: 8px;

	border: 1px solid black;

	display: grid;
`;

const Option = styled.div`
	max-width: 150px;
	overflow: scroll;

	color: ${props => props.theme.black};
	background: white;

	padding: ${props => props.theme.S03};

	font-size: ${props => props.theme.F01};

	cursor: pointer;

	:hover {
		background-color: ${props => props.theme.gray};
	}
`;

export default function TabDropdown(props) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<Wrapper>
			<TabDropButton>&#9660;</TabDropButton>
			<Dropdown>
				<Option>Audible books</Option>
				<Option>Unread books</Option>
				<Option>Option 4</Option>
			</Dropdown>
		</Wrapper>
	);
}
