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
	const [edit, setEdit] = useState(false);

	return (
		<TabStyles
			onClick={() => props.setSelected(props.id)}
			onDoubleClick={() => setEdit(props.selected)}
			onBlur={() => setEdit(false)}
			selected={props.selected}
		>
			<button onClick={async () => await props.deleteList(props.id)}>
				&times;
			</button>
			{renderTitle()}
		</TabStyles>
	);

	function renderTitle() {
		if (edit) {
			return (
				<input
					value={listTitle}
					onChange={event => setListTitle(event.target.value)}
					onKeyPress={async event => {
						if (event.key === "Enter") {
							await props.updateListTitle(props.id, listTitle);
							setEdit(false);
						}
					}}
				/>
			);
		} else {
			return <div>{props.listTitle}</div>;
		}
	}
}
