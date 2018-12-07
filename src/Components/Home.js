import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import List from "./List";
import {
	HomeWrapper,
	Header,
	Lists,
	AddNewList,
	ListWrapper
} from "./HomeStyles";
import { theme, GlobalStyle } from "./GlobalStyles";

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
		fetch(url + `Lists/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name })
		});
	};

	const addNewList = async () => {
		fetch(url + "Lists", {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		});
	};

	const deleteList = async id => {
		fetch(url + `Lists/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
		await refreshBooklist();
	};

	const displayNewList = async () => {
		await addNewList();
		await refreshBooklist();
	};

	return (
		<ThemeProvider theme={theme}>
			<HomeWrapper>
				<Header>Marla's Books!</Header>
				<Lists>
					{loadLists(bookList, lists, updateListTitle, deleteList)}
					<AddNewList>
						<button onClick={displayNewList}>+</button>New List
					</AddNewList>
				</Lists>
				<GlobalStyle />
			</HomeWrapper>
		</ThemeProvider>
	);
}

function loadLists(bookList, lists, updateListTitle, deleteList) {
	if (!lists || !bookList) {
		return "";
	}

	const listMap = createListMap(bookList);

	if (listMap && listMap.size > 0) {
		return renderLists(listMap, lists, updateListTitle, deleteList);
	} else {
		return (
			<ListWrapper>
				<h1>Create a new list to get started!</h1>
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

function renderLists(listMap, lists, updateListTitle, deleteList) {
	const listArray = [];

	listMap.forEach((value, key) => {
		const listName = getListNameById(key);
		listArray.push(
			<List
				key={key}
				id={key}
				bookList={value}
				listTitle={listName || "New List"}
				updateListTitle={updateListTitle}
				deleteList={deleteList}
			/>
		);
	});

	function getListNameById(id) {
		const list = lists.find(list => list.Id === id);
		return list ? list.Name : null;
	}

	return listArray;
}
