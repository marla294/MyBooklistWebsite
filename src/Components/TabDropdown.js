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

	width: ${props => props.theme.S06};
	height: ${props => props.theme.S06};
	border: none;
	color: ${props => props.theme.gray};

	:hover {
		color: ${props => props.theme.blue};
	}
`;

const Dropdown = styled.div`
	position: absolute;
	right: 8px;
	border: 1px solid black;
	background: white;
	display: ${props => (props.showDropdown ? "grid" : "none")};
	z-index: 1000;
`;

// const Option = styled.div`
// 	max-width: 200px;
// 	padding: ${props => props.theme.S03};
// 	overflow: scroll;
// 	color: ${props => props.theme.black};
// 	font-size: ${props => props.theme.F01};
// 	cursor: pointer;

// 	button {
// 		padding: 0 5px 5px 0;

// 		background: white;
// 		color: ${props => props.theme.black};

// 		font-size: ${props => props.theme.F07};
// 		text-align: center;
// 		line-height: ${props => props.theme.S05};

// 		outline: none;
// 	}

// 	:hover {
// 		background-color: ${props => props.theme.gray};
// 	}
// `;

const Option = styled.a`
	max-width: ${props => props.theme.S11};
	padding: ${props => props.theme.S03};
	color: ${props => props.theme.black};

	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;

	button {
		height: 40px;
		font-size: ${props => props.theme.F07};
		background-color: white;
		padding-bottom: 8px;
		margin-left: ${props => props.theme.S02};
		border: none;
	}

	button:hover {
		color: ${props => props.theme.red};
	}

	:hover {
		background-color: ${props => props.theme.gray};
		button {
			background-color: ${props => props.theme.gray};
		}
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
		const options = props.lists.map(list => {
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

	function clickAnOption(listId) {
		setShowDropdown(!showDropdown);
		props.setSelected(listId);
	}

	async function clickAddNewList() {
		setShowDropdown(!showDropdown);
		await props.addNewList("New List");
	}
}
