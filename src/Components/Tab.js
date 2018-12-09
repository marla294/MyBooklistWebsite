import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TabStyles } from "./TabStyles";

Tab.propTypes = {
	id: PropTypes.number.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};

export default function Tab(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles>
			<button onClick={async () => await props.deleteList(props.id)}>
				&times;
			</button>
			<input
				value={listTitle}
				onChange={async event => await setListTitle(event.target.value)}
				onBlur={async () =>
					await props.updateListTitle(props.id, listTitle)
				}
				onKeyPress={async event => {
					if (event.key === "Enter") {
						await props.updateListTitle(props.id, listTitle);
					}
				}}
			/>
		</TabStyles>
	);
}
