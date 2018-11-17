import React from "react";
import { useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import List from "./List/List";

export default function Home() {
	const url = "http://127.0.0.1:8080/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);

	useEffect(() => {
		getBookList();
		getLists();
		updateList();
	}, []);

	const getBookList = async () => {
		let result = await fetch(url + "BookList");
		let r = await result.json();
		setBookList(r);
	};

	const getLists = async () => {
		let result = await fetch(url + "Lists");
		let r = await result.json();
		setLists(r);
	};

	const updateList = async () => {
		fetch(url + "Lists/1", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "from application" })
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<HomeWrapper>
				<Header>Marla's Books!</Header>
				<Lists>{loadLists(bookList, lists)}</Lists>
				<GlobalStyle />
			</HomeWrapper>
		</ThemeProvider>
	);
}

function loadLists(bookList, lists) {
	if (!lists || !bookList) {
		return "Loading...";
	}

	const listMap = createListMap(bookList);

	if (listMap && listMap.size > 0) {
		return renderLists(listMap, lists);
	} else {
		return "Create a new list to get started!";
	}
}

function createListMap(bookList) {
	const listMap = new Map();

	if (bookList) {
		bookList.forEach(book => {
			const bookArray = listMap.get(book.ListId) || [];

			if (bookArray) {
				bookArray.push(book.Book);
			}

			listMap.set(book.ListId, bookArray);
		});
	}

	return listMap;
}

function renderLists(listMap, lists) {
	const renderArray = [];

	listMap.forEach((value, key) => {
		const listName = getListNameById(lists, key);
		renderArray.push(
			<List key={key} bookList={value} listTitle={listName || ""} />
		);
	});

	return renderArray;
}

function getListNameById(lists, id) {
	return lists.find(list => list.Id === id).Name;
}

const theme = {
	black: "#393939",
	red: "#FF0000",
	bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-family: 'greycliff';
		font-size: 10px;
		color: ${props => props.theme.black};
		padding: 0;
		margin: 0;
	}
	body {
		font-family: 'greycliff';
		font-size: 1em;
	}
	*, *:before, *:after {
		box-sizing: inherit;
		font-family: 'greycliff';
	}
	h1, h2, h3, h4, h5, h6, p {
		padding: 0;
		margin: 0;
	}
	a {
		text-decoration: none;
		color: ${props => props.theme.black};
	}
	a:hover {
		color: black;
		text-decoration: none;
	}
	input {
		color: ${props => props.theme.black};
	}
`;

const HomeWrapper = styled.div`
	display: grid;
	grid-template-rows: 10em 1fr;
`;

const Header = styled.h1`
	display: grid;
	font-size: 3.5em;
	align-items: center;
	justify-items: center;
`;

const Lists = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;
