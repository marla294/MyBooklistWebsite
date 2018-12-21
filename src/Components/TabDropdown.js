import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabDropButton = styled.button`
	font-size: ${props => props.theme.F04};
	outline: none;

	width: ${props => props.theme.S06};
	height: ${props => props.theme.S06};
	border: none;
	color: ${props => props.showDropdown ? props.theme.yellow : props.theme.gray};

	:hover {
		color: ${props => props.theme.yellow};
	}
`;

const Dropdown = styled.div`
	position: absolute;
	right: 8px;
	border: 0.3rem solid ${props => props.theme.yellow};
	background: white;
	display: ${props => (props.showDropdown ? "grid" : "none")};
	z-index: 1000;
	box-shadow: ${props => props.theme.bs};
	outline: none;
`;

const Option = styled.a`
	max-width: ${props => props.theme.S13};
	padding: ${props => props.theme.S03};
	color: ${props => props.theme.black};

	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;

	div {
		height: 23px;
		border-bottom: ${props => props.selected ? `0.3rem solid ${props.theme.yellow}` : "none"};
		overflow: hidden;
	}

	button {
		height: 25px;
		line-height: 0;
		font-size: ${props => props.theme.F07};
		background-color: white;
		margin-left: ${props => props.theme.S02};
		padding-bottom: 10px;
		border: none;
	}

	:hover {
		background-color: ${props => props.theme.gray};
		button {
			background-color: ${props => props.theme.gray};
		}
	}
`;

export default class TabDropdown extends React.Component  {
	state = {
		showDropdown: false
	};

	render() {
		return (
			<div>
				<TabDropButton 
					onClick={() => this.setState({showDropdown: !this.state.showDropdown})} 
					
					showDropdown={this.state.showDropdown}
				>
					&#9660;
				</TabDropButton>
				<Dropdown showDropdown={this.state.showDropdown} tabIndex="0">
					{this.renderDropdownOptions()}
				</Dropdown>
			</div>
		);
	}
	

	renderDropdownOptions = () => {
		const options = this.props.lists.map(list => {
			return (
				<Option key={list.Id} onClick={() => this.clickAnOption(list.Id)} selected={list.Id === this.props.selectedList}>
					<div>{list.Name}</div>
					<button
						onClick={async () => {
							await this.props.deleteList(list.Id);
						}}
					>
						&times;
					</button>
				</Option>
			);
		});

		options.push(
			<Option key={"add new list"} onClick={this.clickAddNewList}>
				<i>+ New List</i>
			</Option>
		);

		return options;
	}

	clickAnOption = (listId) => {
		this.setState({showDropdown: !this.state.showDropdown});
		this.props.setSelected(listId);
	}

	clickAddNewList = async () => {
		this.setState({showDropdown: !this.state.showDropdown});
		await this.props.addNewList("New List");
	}
}

TabDropdown.propTypes = {
	lists: PropTypes.array.isRequired,
	selectedList: PropTypes.number.isRequired,
	setSelected: PropTypes.func.isRequired
};