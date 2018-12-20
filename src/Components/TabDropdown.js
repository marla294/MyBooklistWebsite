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
	border: 1px solid black;
	background: white;
	display: ${props => (props.showDropdown ? "grid" : "none")};
	z-index: 1000;
`;

const Option = styled.div`
	max-width: 150px;
	padding: ${props => props.theme.S03};
	overflow: scroll;
	color: ${props => props.theme.black};
	font-size: ${props => props.theme.F01};
	cursor: pointer;

	button {
		padding: 0 5px 5px 0;

		background: white;
		color: ${props => props.theme.black};

		font-size: ${props => props.theme.F07};
		text-align: center;
		line-height: ${props => props.theme.S05};

		outline: none;
	}

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
		const options = filterListsToNotSelected().map(list => {
			return (
				<Option key={list.Id} onClick={() => clickAnOption(list.Id)}>
					{list.Name}
					<button
						onClick={async () => {
							await props.deleteList(list.Id);
						}}
					>
						&times;
					</button>
				</Option>
			);
		});

		options.push(
			<Option key={"add new list"} onClick={clickAddNewList}>
				<i>+ New List</i>
			</Option>
		);

		return options;
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

	async function clickAddNewList() {
		setShowDropdown(!showDropdown);
		await props.addNewList("New List");
	}
}
