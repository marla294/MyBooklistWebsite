import React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./GlobalStyles";
import { HomeWrapper, Header, TabsWrapper, AddNewList } from "./HomeStyles";
import { ListWrapper } from "./ListStyles";
import List from "./List";
import Tab from "./Tab";

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

	// Use with deleting tabs
	const getNewListId = id => {
		const index = lists.findIndex(list => list.Id === id);
		if (lists.length <= 1) return null;
		if (index === lists.length - 1) return lists[index - 1].Id;
		return lists[index + 1].Id;
	};

	// Returns id of added book
	const addBook = async (title, author) => {
		const res = await fetch(url + "Books", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, author })
		});

		const id = await res.json();
		return parseInt(id);
	};

	const addBookToList = async (bookId, listId) => {
		const res = await fetch(url + "BookList", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ bookId, listId })
		});

		const id = await res.json();
		return parseInt(id);
	};

	return (
		<ThemeProvider theme={theme}>
			<HomeWrapper>
				<Header>Marla's Books!</Header>
				<TabsWrapper>{loadTabs()}</TabsWrapper>
				{loadLists()}
				<GlobalStyle />
			</HomeWrapper>
		</ThemeProvider>
	);

	function loadTabs() {
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

	function loadLists() {
		if (createListMap().size > 0 && pageLoaded && selectedList) {
			return renderList();
		} else {
			return (
				<ListWrapper>
					<h1>Loading...</h1>
				</ListWrapper>
			);
		}
	}

	function createListMap() {
		const listMap = new Map();

		if (bookList) {
			bookList.forEach(book => {
				const books = listMap.get(book.ListId) || [];
				books.push(book.Book);
				listMap.set(book.ListId, books);
			});
		}

		return listMap;
	}

	function renderList() {
		const books = createListMap().get(selectedList);

		return (
			<List
				key={selectedList}
				id={selectedList}
				books={books}
				addBook={addBook}
				addBookToList={addBookToList}
			/>
		);
	}
}
