import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Tab.propTypes = {
	id: PropTypes.number.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};

const TabStyles = styled.div`
	width: ${props => props.theme.S11};
	height: 0;

	border-bottom: ${props => props.theme.S06} solid
		${props => props.theme.blue};
	border-right: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);
	border-left: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);

	display: grid;
	grid-template-columns: 15fr 1fr;

	* {
		height: ${props => props.theme.S06};

		color: ${props => props.theme.black};
		background: ${props => props.theme.blue};

		border: none;
		outline: none;
		cursor: pointer;
	}

	input {
		width: 95%;

		font-size: ${props => props.theme.F03};
	}
`;

/* 
The Tab component is the title of the list being shown on the screen.  It is meant to look like a file tab.  You can edit the list name by typing in the new name and clicking enter or clicking off the tab.  You can delete the list name by clicking the "x" button on the side of the tab.  An other list that you have created will show up in the deleted list's place.
*/
export default function Tab(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles>
			<input
				value={listTitle}
				onChange={event => setListTitle(event.target.value)}
				onKeyPress={async event => {
					if (event.key === "Enter") {
						await props.updateListTitle(props.id, listTitle);
					}
				}}
				onBlur={async event => {
					await props.updateListTitle(props.id, listTitle);
				}}
			/>
		</TabStyles>
	);
}
