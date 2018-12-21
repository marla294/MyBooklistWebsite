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
		color: ${props => props.theme.yellow};
	}
`;

const Dropdown = styled.div`
	position: absolute;
	right: 8px;
	border: 0.3rem solid ${props => props.theme.yellow};
	background: white;
	display: ${props => (props.showDropdown ? "grid" : "none")};
	z-index: 1000;
	box-shadow: ${props => props.theme.bs};
`;

const Option = styled.a`
	max-width: ${props => props.theme.S12};
	padding: ${props => props.theme.S03};
	color: ${props => props.theme.black};

	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;

	div {
		height: 25px;
		border-bottom: ${props => props.selected ? `0.3rem solid ${props.theme.yellow}` : "none"};
	}

	button {
		height: 30px;
		line-height: 0;
		font-size: ${props => props.theme.F07};
		background-color: white;
		margin-left: ${props => props.theme.S02};
		padding-bottom: 10px;
		border: none;
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
				<Option key={list.Id} onClick={() => clickAnOption(list.Id)} selected={list.Id === props.selectedList}>
					<div>{list.Name}</div>
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
