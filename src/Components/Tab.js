import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabStyles = styled.div`
	width: 100%;
	height: 0;

	border-bottom: ${props => props.theme.S06} solid
		${props => props.theme.blue};
	border-right: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);
	border-left: ${props => props.theme.S04} solid rgba(255, 0, 0, 0);

	input {
		width: 95%;
		height: ${props => props.theme.S06};

		color: ${props => props.theme.black};
		background: ${props => props.theme.blue};

		border: none;
		outline: none;
		cursor: pointer;

		font-size: ${props => props.theme.F03};

		:focus {
			font-style: italic;
		}
	}
`;

/* 
The Tab component is the title of the list being shown on the screen.  It is meant to look like a file tab.  You can edit the list name by typing in the new name and clicking enter or clicking off the tab.  You can delete the list name by clicking the "x" button on the side of the tab.  An other list that you have created will show up in the deleted list's place.
*/
export default class Tab extends React.Component {
	state = {
		listTitle: this.props.listTitle
	};

	componentDidMount() {
		this.myInput = React.createRef();
	}

	render() {
		return (
			<TabStyles>
				<input
					ref={this.myInput}
					value={this.state.listTitle}
					onChange={event =>
						this.setState({ listTitle: event.target.value })
					}
					onKeyPress={async event => {
						if (event.key === "Enter") {
							this.myInput.current.blur();
						}
					}}
					onBlur={async event => {
						await this.props.updateListTitle(
							this.props.id,
							this.state.listTitle
						);
					}}
				/>
			</TabStyles>
		);
	}
}

Tab.propTypes = {
	id: PropTypes.number.isRequired,
	listTitle: PropTypes.string.isRequired,
	updateListTitle: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
};
