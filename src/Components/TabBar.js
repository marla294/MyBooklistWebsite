import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tab from "./Tab";

TabBar.propTypes = {
	addNewList: PropTypes.func.isRequired,
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};

const TabsWrapper = styled.div`
	display: grid;
	grid-template-columns: 10fr 1fr;
	width: 100%;
`;

const TabDropButton = styled.button`
	color: ${props => (props.selected ? props.theme.black : props.theme.gray)};
	background: white;
	font-size: ${props => props.theme.F07};
	width: ${props => props.theme.S06};
	border: none;
	outline: none;
	justify-items: end;
	:hover {
		color: ${props => props.theme.blue};
	}
`;

const AddNewList = styled.label`
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-gap: ${props => props.theme.S01};
	color: ${props => props.theme.gray};
	padding-left: ${props => props.theme.S03};
	justify-self: start;
	align-items: center;
	button {
		padding: 0;
		padding-bottom: 0.7rem;
		font-size: 3rem;
		width: 2rem;
		height: 2rem;
		border-radius: 5rem;
		line-height: 0;
		outline: none;
		border-color: ${props => props.theme.gray};
		color: ${props => props.theme.gray};
		:hover {
			border-color: ${props => props.theme.blue};
			color: ${props => props.theme.blue};
		}
	}
	:hover {
		color: ${props => props.theme.blue};
	}
`;

export default function TabBar(props) {
	return (
		<React.Fragment>
			<AddNewList key={0}>
				<button
					onClick={async () => {
						await props.addNewList("New List");
					}}
				>
					+
				</button>
				Add New List
			</AddNewList>
			{loadTabs()}
		</React.Fragment>
	);

	function loadTabs() {
		let selected;

		if (props.lists.length > 0) {
			selected = props.lists.find(list => list.Id === props.selectedList);
		}

		if (selected) {
			return (
				<TabsWrapper>
					<Tab
						key={selected.Id}
						id={selected.Id}
						listTitle={selected.Name}
						updateListTitle={props.updateListTitle}
						deleteList={props.deleteList}
					/>
					<TabDropButton>&#9660;</TabDropButton>
				</TabsWrapper>
			);
		}
	}
}
