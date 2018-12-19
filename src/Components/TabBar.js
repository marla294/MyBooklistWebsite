import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tab from "./Tab";
import TabDropdown from "./TabDropdown";

TabBar.propTypes = {
	addNewList: PropTypes.func.isRequired,
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};

const TabsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 9fr;
	width: 100%;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;

	button {
		width: ${props => props.theme.S06};
		height: ${props => props.theme.S06};
		border: none;

		color: ${props => props.theme.gray};

		:hover {
			color: ${props => props.theme.blue};
		}
	}
`;

const AddNewList = styled.button`
	font-size: ${props => props.theme.F09};
	line-height: 0;
	padding-bottom: 13px;
`;

/* 
The tab bar component holds the current list tab, the create a new list button, and the tab dropdown which holds all the users lists that aren't being displayed right now.
*/
export default function TabBar(props) {
	return (
		<TabsWrapper>
			{loadTab()}
			<ButtonGroup>
				<AddNewList
					onClick={async () => await props.addNewList("New List")}
				>
					+
				</AddNewList>
				<TabDropdown
					lists={props.lists}
					selectedList={props.selectedList}
				/>
			</ButtonGroup>
		</TabsWrapper>
	);

	function loadTab() {
		let selected;

		if (props.lists.length > 0) {
			selected = props.lists.find(list => list.Id === props.selectedList);
		}

		if (selected) {
			return (
				<Tab
					key={selected.Id}
					id={selected.Id}
					listTitle={selected.Name}
					updateListTitle={props.updateListTitle}
					deleteList={props.deleteList}
				/>
			);
		}
	}
}
