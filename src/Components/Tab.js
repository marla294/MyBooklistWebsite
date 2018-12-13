import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TabStyles } from "./TabStyles";

Tab.propTypes = {
	id: PropTypes.number.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired,
	setSelected: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired
};

export default function Tab(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles
			onClick={() => props.setSelected(props.id)}
			selected={props.selected}
		>
			{renderTitle()}
			<button
				onClick={async () => {
					await props.deleteList(props.id);
				}}
			>
				&times;
			</button>
		</TabStyles>
	);

	function renderTitle() {
		return (
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
		);
	}
}
