import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import List from "./List";
import Tab from "./Tab";
import { theme, GlobalStyle } from "./GlobalStyles";
import {
	HomeWrapper,
	Header,
	Lists,
	ListWrapper,
	TabsWrapper,
	AddNewList
} from "./HomeStyles";

export default function Home() {
	const url = "http://127.0.0.1:8080/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);
	const [selectedList, setSelected] = useState(null);
	const [pageLoaded, setPageLoaded] = useState(false);

	useEffect(async () => {
		await refreshBooklist();
		setPageLoaded(true);
	}, []);

	useEffect(
		async () => {
			setSelected(getFirstListId());
			await refreshBooklist();
		},
		[pageLoaded]
	);

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
		const res = await fetch(url + "Lists", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name })
		});
		// When new list is created it is automatically selected
		const id = await res.json();
		setSelected(parseInt(id));
		await refreshBooklist();
	};

	const deleteList = async id => {
		await fetch(url + `Lists/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
		setSelected(getNewListId(id));
		await refreshBooklist();
	};

	const getFirstListId = () => {
		if (lists && lists[0]) return lists[0].Id;
		else return null;
	};

	const getNewListId = id => {
		const index = lists.findIndex(list => list.Id === id);
		if (lists.length <= 1) return null;
		if (index === lists.length - 1) return lists[index - 1].Id;
		return lists[index + 1].Id;
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

	function loadTabs(lists, updateListTitle, deleteList, addNewList) {
		const tabArray = [];
		var count = 1;

		if (lists) {
			lists.forEach(list => {
				tabArray.push(
					<Tab
						key={list.Id}
						id={list.Id}
						count={count}
						listTitle={list.Name}
						updateListTitle={updateListTitle}
						deleteList={deleteList}
						selected={selectedList === list.Id}
						setSelected={setSelected}
					/>
				);
				count++;
			});
		}

		tabArray.push(
			<AddNewList key={0}>
				<button
					onClick={async () => {
						await addNewList("New List");
					}}
				>
					+
				</button>
			</AddNewList>
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
		if (selectedList) {
			const listArray = listMap.get(selectedList);
			return (
				<List
					key={selectedList}
					id={selectedList}
					bookList={listArray}
				/>
			);
		} else {
			return <p>Loading...</p>;
		}
	}
}
