import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tab from "./Tab";
import TabDropdown from "./TabDropdown";

TabBar.propTypes = {
	addNewList: PropTypes.func.isRequired,
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	setSelected: PropTypes.func.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};

const TabsWrapper = styled.div`
	justify-self: center;

	display: grid;
	grid-template-columns: 95fr 5fr;
	width: 100%;

	@media only screen and (min-width: 768px) {
		width: 768px;
	}
`;

/* 
The tab bar component holds the current list and the tab dropdown which holds all the users lists that aren't being displayed right now.
*/
export default function TabBar(props) {
	return (
		<TabsWrapper>
			{loadTab()}
			<TabDropdown
				lists={props.lists}
				selectedList={props.selectedList}
				setSelected={props.setSelected}
				addNewList={props.addNewList}
				deleteList={props.deleteList}
				currentUser={props.currentUser}
			/>
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
