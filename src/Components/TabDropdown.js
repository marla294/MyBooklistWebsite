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
	outline: none;
`;

const Dropdown = styled.div`
	position: absolute;
	right: 8px;

	border: 1px solid black;

	display: ${props => (props.showDropdown ? "grid" : "none")};
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
			<TabDropButton onClick={() => setShowDropdown(!showDropdown)}>
				&#9660;
			</TabDropButton>
			<Dropdown showDropdown={showDropdown}>
				{renderDropdownOptions()}
			</Dropdown>
		</Wrapper>
	);

	function renderDropdownOptions() {
		return filterListsToNotSelected().map(list => {
			return <Option key={list.Id}>{list.Name}</Option>;
		});
	}

	function filterListsToNotSelected() {
		// Make a deep copy of lists
		let listsCopy = [];
		props.lists.forEach(list => {
			listsCopy.push(list);
		});

		// Get index of list to remove
		const spliceIndex = props.lists.findIndex(list => {
			return list.Id === props.selectedList;
		});

		// If the selected list is found, return that, otherwise return full array
		if (spliceIndex !== -1) {
			listsCopy.splice(spliceIndex, 1);
			return listsCopy;
		}
		return props.lists;
	}
}
