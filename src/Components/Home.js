import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import jwt from "jsonwebtoken";
import { theme, GlobalStyle } from "./GlobalStyles";
import List, { ListWrapper } from "./List";
import TabBar from "./TabBar";
import SignInPage from "./SignInPage";

export const HomeWrapper = styled.div`
	display: grid;
	grid-template-rows: 8rem 1fr;
`;

export const Header = styled.h1`
	display: grid;
	align-items: center;
	justify-items: center;

	color: ${props => props.theme.orange};

	font-size: ${props => props.theme.F09};
`;

export default function Home(props) {
	const url = "http://127.0.0.1:8080/api/";
	const [bookList, setBookList] = useState(null);
	const [lists, setLists] = useState(null);
	const [selectedList, setSelected] = useState(null);
	const [pageLoaded, setPageLoaded] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(async () => {
		if (getToken()) {
			await setCurrentUserFromCookie();
			await refreshBooklist(currentUser.Id);
		}
		setPageLoaded(true);
	}, []);

	useEffect(
		async () => {
			if (getToken()) {
				setSelected(getFirstListId());
				await refreshBooklist(currentUser.Id);
			}
		},
		[pageLoaded]
	);

	const refreshBooklist = async userId => {
		await getLists(userId);
		await getBookList();
	};

	const getBookList = async () => {
		const result = await fetch(url + "BookList");
		const r = await result.json();
		setBookList(r);
	};

	const getLists = async userId => {
		const result = await fetch(url + `Lists/${userId}`);
		const r = await result.json();

		console.log(result);

		setLists(r);
	};

	const updateListTitle = async (id, name) => {
		await fetch(url + `Lists/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name })
		});
		await refreshBooklist(currentUser.Id);
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
		await refreshBooklist(currentUser.Id);
	};

	const deleteList = async id => {
		await fetch(url + `Lists/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});
		setSelected(getNewListId(id));
		await refreshBooklist(currentUser.Id);
	};

	const getFirstListId = () => {
		const filteredLists = filterLists();

		if (filteredLists && filteredLists[0]) return filteredLists[0].Id;
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

		await refreshBooklist(currentUser.Id);

		const id = await res.json();
		return parseInt(id);
	};

	const deleteBook = async id => {
		await fetch(url + `Books/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		});

		await refreshBooklist(currentUser.Id);
	};

	const deleteBookFromList = async (bookId, listId) => {
		const id = bookList.find(item => {
			return item.Book.Id === bookId && item.ListId === listId;
		}).Id;

		if (id) {
			await fetch(url + `BookList/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});

			await refreshBooklist(currentUser.Id);
		}
	};

	const signIn = async id => {
		const token = jwt.sign({ userId: id }, "sdfg");

		props.cookies.set("token", token, {
			maxAge: 60 * 60 * 24 * 365
		});

		await setCurrentUserById(id);
		await refreshBooklist(parseInt(id));
		setSelected(getFirstListId());
	};

	const signOut = () => {
		props.cookies.remove("token");

		setCurrentUser(null);
		setSelected(null);
	};

	const setCurrentUserFromCookie = async () => {
		// First get the token from the cookie
		const token = getToken();

		// Next get the userId from the token
		const { userId } = jwt.verify(token, "sdfg");

		// Finally load the current user by id
		await setCurrentUserById(userId);
	};

	const getToken = () => {
		return props.cookies.get("token");
	};

	const addNewUser = async (name, username, password) => {
		const result = await fetch(url + "Users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name,
				username: username.toLowerCase(),
				password
			})
		});

		return await result.json();
	};

	const validateUser = async (username, password) => {
		const result = await fetch(url + "Users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: "",
				username: username.toLowerCase(),
				password
			})
		});

		return await result.json();
	};

	const setCurrentUserById = async id => {
		const result = await fetch(url + `Users/${id}`);
		const r = await result.json();

		setCurrentUser(r);
	};

	return (
		<ThemeProvider theme={theme}>
			<SignInPage
				getToken={getToken}
				addNewUser={addNewUser}
				signIn={signIn}
				validateUser={validateUser}
			>
				<HomeWrapper>
					<Header>
						{currentUser
							? `${currentUser.Name}'s Books!`
							: "My Books!"}
					</Header>
					<button onClick={signOut}>Log out</button>
					<TabBar
						addNewList={addNewList}
						lists={filterLists() || []}
						selectedList={selectedList || 0}
						setSelected={setSelected}
						updateListTitle={updateListTitle}
						deleteList={deleteList}
						currentUser={currentUser}
					/>
					{loadLists()}
					<GlobalStyle />
				</HomeWrapper>
			</SignInPage>
		</ThemeProvider>
	);

	function filterLists() {
		if (currentUser && lists) {
			return lists.filter(list => list.Owner.Id === currentUser.Id);
		}

		return lists;
	}

	function loadLists() {
		if (pageLoaded) {
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
				deleteBook={deleteBook}
				deleteBookFromList={deleteBookFromList}
			/>
		);
	}
}
