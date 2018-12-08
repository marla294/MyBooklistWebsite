import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import List from "./List";
import Tab from "./Tab";
import NewListTab from "./NewListTab";
import { theme, GlobalStyle } from "./GlobalStyles";
import {
	HomeWrapper,
	Header,
	Lists,
	ListWrapper,
	TabsWrapper
} from "./HomeStyles";

export default function Home() {
	const url = "http://127.0.0.1:8080/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);

	useEffect(() => {
		refreshBooklist();
	}, []);

	const refreshBooklist = async () => {
		await getLists();
		await getBookList();
	};

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

	const updateListTitle = async (id, name) => {
		await fetch(url + `Lists/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name })
		});
		await refreshBooklist();
	};

	const addNewList = async name => {
		await fetch(url + "Lists", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name })
		});
		await refreshBooklist();
	};

	const deleteList = async id => {
		await fetch(url + `Lists/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
		await refreshBooklist();
	};

	return (
		<ThemeProvider theme={theme}>
			<HomeWrapper>
				<Header>Marla's Books!</Header>
				<TabsWrapper>
					{loadTabs(lists, updateListTitle, deleteList, addNewList)}
				</TabsWrapper>
				<Lists>{loadLists(bookList, lists)}</Lists>
				<GlobalStyle />
			</HomeWrapper>
		</ThemeProvider>
	);
}

function loadTabs(lists, updateListTitle, deleteList, addNewList) {
	const tabArray = [];

	if (lists) {
		lists.forEach(list => {
			tabArray.push(
				<Tab
					key={list.Id}
					id={list.Id}
					listTitle={list.Name}
					updateListTitle={updateListTitle}
					deleteList={deleteList}
				/>
			);
		});
	}

	tabArray.push(
		<NewListTab
			key={0}
			listTitle={"Add New List"}
			addNewList={addNewList}
		/>
	);

	return tabArray;
}

function loadLists(bookList, lists) {
	if (!lists || !bookList) {
		return "";
	}

	const listMap = createListMap(bookList);

	if (listMap && listMap.size > 0) {
		return renderLists(listMap);
	} else {
		return (
			<ListWrapper>
				<h1>Add a book to get started!</h1>
			</ListWrapper>
		);
	}
}

function createListMap(bookList) {
	const listMap = new Map();

	if (bookList) {
		bookList.forEach(book => {
			const bookArray = listMap.get(book.ListId) || [];
			bookArray.push(book.Book);
			listMap.set(book.ListId, bookArray);
		});
	}

	return listMap;
}

function renderLists(listMap) {
	const listArray = [];

	listMap.forEach((value, key) => {
		listArray.push(<List key={key} id={key} bookList={value} />);
	});

	return listArray;
}
