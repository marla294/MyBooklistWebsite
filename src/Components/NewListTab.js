import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TabStyles } from "./TabStyles";

NewList.propTypes = {
	listTitle: PropTypes.string.isRequired,
	addNewList: PropTypes.func.isRequired
};

export default function NewList(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles type={"NewList"}>
			<input
				value={listTitle}
				onChange={event => setListTitle(event.target.value)}
				onKeyPress={async event => {
					if (event.key === "Enter") {
						setListTitle("Add New List");
						await props.addNewList(listTitle);
					}
				}}
			/>
		</TabStyles>
	);
}