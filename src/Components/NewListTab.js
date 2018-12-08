import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TabStyles } from "./TabStyles";

NewList.propTypes = {
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	displayNewList: PropTypes.func.isRequired
};

export default function NewList(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles>
			<input
				value={listTitle}
				onChange={event => setListTitle(event.target.value)}
				onBlur={() => {
					props.displayNewList(listTitle);
				}}
			/>
		</TabStyles>
	);
}
