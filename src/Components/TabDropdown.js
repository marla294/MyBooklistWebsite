import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

TabDropdown.propTypes = {
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	setSelected: PropTypes.func.isRequired,
	createNewList: PropTypes.func.isRequired
};

const Container = styled.div`
	position: relative;
`;

const TabDropButton = styled.button`
	width: ${props => props.theme.S06};
	height: ${props => props.theme.S06};

	background: none;
	color: ${props =>
		props.showDropdown ? props.theme.orange : props.theme.gray};

	border: none;
	outline: none;

	font-size: ${props => props.theme.F04};

	:hover {
		color: ${props => props.theme.darkorange};
	}
`;

const Dropdown = styled.div`
	width: ${props => props.theme.S11};

	position: absolute;
	right: 0;

	background-color: white;

	border: 0.3rem solid ${props => props.theme.darkorange};

	display: ${props => (props.showDropdown ? "grid" : "none")};

	box-shadow: ${props => props.theme.bs};
	cursor: pointer;
`;

const Option = styled.a`
	max-width: ${props => props.theme.S12};
	height: ${props => props.theme.S07};

	padding: ${props => props.theme.S03};

	color: ${props => props.theme.black};

	display: flex;
	justify-content: space-between;

	div {
		height: 25px;

		border-bottom: ${props =>
			props.selected ? `0.3rem solid ${props.theme.darkorange}` : "none"};
	}

	button {
		padding: 0;
		margin: 0;
		margin-left: ${props => props.theme.S02};
		padding-bottom: 10px;

		color: white;
		background-color: white;

		border: none;

		font-size: ${props => props.theme.F07};
		line-height: 0;

		outline: none;
	}

	button:hover {
		color: ${props => props.theme.black};
	}

	:hover {
		background-color: ${props => props.theme.gray};

		button {
			background-color: ${props => props.theme.gray};
		}
	}
`;

const NewListOption = styled.a`
	height: ${props => props.theme.S07};

	padding: ${props => props.theme.S03};

	color: ${props => props.theme.black};

	font-size: ${props => props.theme.F04};
	font-weight: 700;

	:hover {
		background-color: ${props => props.theme.gray};
	}
`;

export default function TabDropdown(props) {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<Container>
			<TabDropButton
				onClick={() => setShowDropdown(!showDropdown)}
				showDropdown={showDropdown}
			>
				&#9660;
			</TabDropButton>
			<Dropdown showDropdown={showDropdown}>
				{renderDropdownOptions()}
			</Dropdown>
		</Container>
	);

	function renderDropdownOptions() {
		let options = [];

		options = props.lists.map(list => {
			return (
				<Option
					key={list.Id}
					onClick={() => clickAnOption(list.Id)}
					selected={list.Id === props.selectedList}
				>
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
			<NewListOption key={"add new list"} onClick={clickAddNewList}>
				<i>+ New List</i>
			</NewListOption>
		);

		return options;
	}

	function clickAnOption(listId) {
		setShowDropdown(!showDropdown);
		props.setSelected(listId);
	}

	async function clickAddNewList() {
		setShowDropdown(!showDropdown);
		await props.createNewList("New List", props.getUserTokenFromCookie());
	}
}
