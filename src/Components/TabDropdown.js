import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

TabDropdown.propTypes = {
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	setSelected: PropTypes.func.isRequired
};

const TabDropButton = styled.button`
	font-size: ${props => props.theme.F04};
	outline: none;
`;

const Dropdown = styled.div`
	position: absolute;
	right: 8px;

	border: none;
	background: ${props => props.theme.yellow};

	display: ${props => (props.showDropdown ? "grid" : "none")};

	z-index: 1000;
`;

const Option = styled.div`
	max-width: 150px;
	overflow: scroll;

	color: ${props => props.theme.black};

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
		<div>
			<TabDropButton onClick={() => setShowDropdown(!showDropdown)}>
				&#9660;
			</TabDropButton>
			<Dropdown showDropdown={showDropdown}>
				{renderDropdownOptions()}
			</Dropdown>
		</div>
	);

	function renderDropdownOptions() {
		return filterListsToNotSelected().map(list => {
			return (
				<Option key={list.Id} onClick={() => clickAnOption(list.Id)}>
					{list.Name}
				</Option>
			);
		});
	}

	function filterListsToNotSelected() {
		// Make a deep copy of lists
		const listsCopy = [];
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

	function clickAnOption(listId) {
		setShowDropdown(!showDropdown);
		props.setSelected(listId);
	}
}
