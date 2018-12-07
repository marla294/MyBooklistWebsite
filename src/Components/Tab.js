import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TabStyles } from "./TabStyles";

Tab.propTypes = {
	listTitle: PropTypes.string.isRequired
};

export default function Tab(props) {
	const [listTitle, setListTitle] = useState(props.listTitle);

	return (
		<TabStyles>
			<input value={listTitle} />
		</TabStyles>
	);
}
